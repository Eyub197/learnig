import zlFetch from "https://cdn.jsdelivr.net/npm/zl-fetch@6.0.0/src/index.js";

// zlFetch("https://jsonplaceholder.typicode.com/posts/90").then((data) =>
//   console.log(data),
// );

// const response = await zlFetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   body: {
//     title: "Road to senior",
//     status: "publihsed",
//     body: "text",
//   },
// });

// const responseTwo = await zlFetch(
//   "https://jsonplaceholder.typicode.com/posts",
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "x-www-form-urlencoded",
//     },
//     body: {
//       title: "Road to senior",
//       status: "publihsed",
//       body: "text",
//     },
//   },
// );
// console.log(responseTwo);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! CRITICAL SECURITY WARNING !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// The GitHub API key below is a secret. You have exposed it in your code.
// Anyone with this key can access your GitHub account with your permissions.
// 1. GO TO GITHUB NOW AND REVOKE THIS TOKEN: https://github.com/settings/tokens
// 2. Do not commit secrets to your repository. Use environment variables or a backend service.
const apiKey = "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";

// The endpoint to get the authenticated user's repositories is /user/repos
zlFetch("https://api.github.com/user/repos", {
  // The 'auth' object in zl-fetch is likely for Basic Authentication (user/password).
  // For a GitHub token (Bearer token), you must set the 'Authorization' header directly.
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
}).then((data) => console.log(data));
