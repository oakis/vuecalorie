export const doFetch = (endpoint: string, options?: RequestInit) =>
  fetch(`https://localhost:7122/api/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => err);
