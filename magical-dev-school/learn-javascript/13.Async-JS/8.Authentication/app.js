const apiKey = "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";
const response = await fetch("https://api.github.com/user/repos", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});
const data = await response.json();

console.log(data);
