# TODO list

## Primary TODOs
- [ ] Add react-router 
- [ ] Route to Login first and then to Dash
- [ ] Update fetch calls for /lists CRUD to include the token
- [ ] update backend endpoints to include the user.id when reading and writing from lists or store lists as a sub-schema on the user.
- [ ] add better error handling for /list in client

## Nice to have TODOs
- [ ] Use useOptimistic hook 

## TADONE

- [x] Host in Docker 
- [x] move create list to the top 
- [x] Add AI task suggestion 

## AI task suggestion notes 

AI task suggestion assistance: https://developer.chrome.com/docs/extensions/ai/prompt-api

  - Prompt: "Given the following list of items, suggest some related items in the same theme: tree, lake, springs, breeze, sunshine, flowers. Return one or two word answers as a JSON array."

```js
[
  "Forest",
  "Wildlife",
  "Mountains",
  "Birds",
  "Reflection"
]
```

NPM API Docs: https://www.npmjs.com/package/@google/genai 

Rate Limits: https://ai.google.dev/gemini-api/docs/rate-limits#free-tier 

