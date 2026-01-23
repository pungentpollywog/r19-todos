# TODO list

## Primary TODOs
### Frontend
- [x] Add react-router 
- [x] Route to Login first and then to Dash
- [x] Store token in context
- [x] handle authN (check if authN and route accordingly)
- [ ] handle getting a new accessToken if manually refreshing the browser (once there is a refreshToken in place on the backend)
- [ ] Update fetch calls for /lists CRUD to include the token
 from lists or store lists as a sub-schema on the user.
- [ ] add better error handling for /list in client
### Backend
  - [ ] move MongoDB connect to server.js
  - [ ] add refresh token
  - [ ] update backend endpoints to include the user.id when reading and writing

## Nice to have TODOs
### Frontend
- [ ] Use useOptimistic hook 
- [ ] Suspense maybe

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

