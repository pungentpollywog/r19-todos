# TODO list

## Primary TODOs

### Frontend
- [ ] handle getting a new accessToken if manually refreshing the browser (once there is a refreshToken in place on the backend)
- [ ] handle getting a new accessToken if current one expires.
- [ ] update Lists component to only include Suggestions if there is a value defined for VITE_GEMINI_API_KEY in `.env` file.
- [ ] add better error handling in Dash component 

### Backend
- [ ] store lists as a sub-schema on the user endpoint (ie. move to users/123/lists )
- [ ] start using `.env` file (already added dotenv library)
- [ ] move MongoDB connect and disconnect to server.js
- [ ] create a new refresh token on each refresh call
- [ ] consolidate code in login, signup, and refresh under an auth router (and DRY it up - same code for creating an access token JWT in both login and refresh) or keep em separate and just use common helper function(s)

## Nice to have TODOs

### Frontend
- [ ] Use useOptimistic hook
- [ ] Suspense maybe

## TADONE

### Frontend
- [x] Host in Docker
- [x] move create list to the top
- [x] Add AI task suggestion
- [x] Add react-router
- [x] Route to Login first and then to Dash
- [x] Store token in context
- [x] handle authN (check if authN and route accordingly)
- [x] Update fetch calls for /lists CRUD to include the access token 
- [x] add better error handling for /list in client

### Backend
- [x] add refresh token when logging in
- [x] create /refresh endpoint
- [x] use authentication with lists

## AI task suggestion notes

AI task suggestion assistance: https://developer.chrome.com/docs/extensions/ai/prompt-api

- Prompt: "Given the following list of items, suggest some related items in the same theme: tree, lake, springs, breeze, sunshine, flowers. Return one or two word answers as a JSON array."

```js
['Forest', 'Wildlife', 'Mountains', 'Birds', 'Reflection'];
```

NPM API Docs: https://www.npmjs.com/package/@google/genai

Rate Limits: https://ai.google.dev/gemini-api/docs/rate-limits#free-tier
