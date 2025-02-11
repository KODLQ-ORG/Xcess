// utils/api.js
// This is a utility file where we'll create a reusable fetch function

export const fetchData = async <T>(url: string, token?: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const data = await response.json();
  return data;
};
