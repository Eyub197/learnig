async function getRepos() {
  try {
    const response = await fetch("https://api.github.com/users/zellwk/repo");
    if (!response.ok) {
      throw new Error("sometihng went wrong");
    }
    const repos = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getReposCatch() {
  const response = await fetch("https://api.github.com/users/zellwk/repo");
  if (!response.ok) {
    throw new Error("sometihng went wrong");
  }

  return response.json();
}

getReposCatch().catch((error) => console.log(error));
