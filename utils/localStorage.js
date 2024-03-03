export const getFromStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const updateStorage = (key, value) => {
  const temp = localStorage.getItem(key) || '{}';
  const tempjson = JSON.parse(temp);
  tempjson[key] = value;
  localStorage.setItem(key, JSON.stringify(value));
  return localStorage.getItem(key);
};

export const deleteFromStorage = (key) => localStorage.removeItem(key);
