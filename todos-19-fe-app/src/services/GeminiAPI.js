import { GoogleGenAI } from '@google/genai';
// @ts-ignore
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


export async function getListSuggestions(tasks) {
  const taskListStr = tasks.map((task) => task.desc).join(', ');

  console.log({ taskListStr });

  if (tasks.length > 0) {
    const prompt = `Given the following list of items, suggest some related items of the same type: [${taskListStr}]. Return one or two word answers as a JSON array.`;

    console.log({ prompt });

    const resp = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // 'gemini-2.0-flash-001',
      contents: prompt,
    });

    // const resp = {
    //   text: '```json ["toyota", "honda","nissan"]```'
    //   .replace('```json', '').replace('```', ''),
    // };

    const suggestions = JSON.parse(
      resp.text?.replace('```json', '').replace('```', '') ?? ''
    );

    console.log('parsed JSON', suggestions);
    return suggestions.map(idea => ({id: crypto.randomUUID(), idea}));
  } else {
    return null;
  }
}
