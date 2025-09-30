import { useEffect, useRef, useState } from 'react';

import { Subject, throttleTime } from 'rxjs';

import { getListSuggestions } from '../services/GeminiAPI.js';

import './Suggestions.scss';

const throttleAmount = 7000;

export default function Suggestions({ items, addItem }) {
  const cachedSuggestions = useRef([]);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionSubject = useRef(new Subject());

  useEffect(() => {
    // Throttle to stay within Gemini free tier usage limits.
    const sub = suggestionSubject.current
      .pipe(throttleTime(throttleAmount))
      .subscribe((items) => {
        getSuggestions(items);
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    suggestionSubject.current.next(items);
  }, [items]);

  function getSuggestions(items) {
    if (!items.length) {
      console.warn('No items. Skipping suggestions query.');
      return;
    }

    if (cachedSuggestions.current.length < 3) {
      getListSuggestions(items).then((suggestions) => {
        if (suggestions) {
          setSuggestions(suggestions);
          cachedSuggestions.current = [...suggestions];
        } else {
          console.warn('Did not retreive suggestions.');
        }
      });
    } else {
      setSuggestions(cachedSuggestions.current);
    }
  }

  function addSuggestion(idea) {
    const idx = suggestions.findIndex((suggest) => suggest.idea === idea);
    if (idx >= 0) {
      const newSuggestions = suggestions.toSpliced(idx, 1);
      cachedSuggestions.current = [...newSuggestions];
      setSuggestions(newSuggestions);
      addItem(idea);
    }
  }

  return (
    <section className="suggestions">
      <h4>
        <svg
          className="sparkle"
          height="24"
          width="24"
          aria-hidden="true"
          viewBox="0 0 471 471"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M235.5 471C235.5 438.423 229.22 407.807 216.66 379.155C204.492 350.503 187.811 325.579 166.616 304.384C145.421 283.189 120.498 266.508 91.845 254.34C63.1925 241.78 32.5775 235.5 0 235.5C32.5775 235.5 63.1925 229.416 91.845 217.249C120.498 204.689 145.421 187.811 166.616 166.616C187.811 145.421 204.492 120.497 216.66 91.845C229.22 63.1925 235.5 32.5775 235.5 0C235.5 32.5775 241.584 63.1925 253.751 91.845C266.311 120.497 283.189 145.421 304.384 166.616C325.579 187.811 350.503 204.689 379.155 217.249C407.807 229.416 438.423 235.5 471 235.5C438.423 235.5 407.807 241.78 379.155 254.34C350.503 266.508 325.579 283.189 304.384 304.384C283.189 325.579 266.311 350.503 253.751 379.155C241.584 407.807 235.5 438.423 235.5 471Z"
          ></path>
        </svg>
        Suggestions
      </h4>
      {suggestions?.map(
        (suggestion, idx) =>
          idx < items.length - 1 && (
            <button
              key={suggestion.id}
              title="add to list"
              onClick={() => addSuggestion(suggestion.idea)}
            >
              {suggestion.idea}
            </button>
          )
      )}
    </section>
  );
}
