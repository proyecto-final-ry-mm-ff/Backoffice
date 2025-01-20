import { store } from "../redux/store";

export const GetBearerToken = () => {
  const state = store.getState();
  return state.userStore?.token || null;
};

export const GetRandomString = (length) => {
  var s = "";
  var randomchar = function () {
    var n = Math.floor(Math.random() * 62);
    if (n < 10) return n; //1-10
    if (n < 36) return String.fromCharCode(n + 55); //A-Z
    return String.fromCharCode(n + 61); //a-z
  };
  while (s.length < length) s += randomchar();
  return s;
};
