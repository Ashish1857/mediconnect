import { v4 } from "uuid";

export const setUserAsLoggedIn = () => {
  const id = v4();

  if (document) {
    document.cookie = `loginid=${id}`;
  }
  return null;
};

export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const isUserLoggedIn = async () => {
  const loginid = getCookie("loginid");
  return !!loginid;
};
