import Cookies from "js-cookie";

const TokenKey = "123";
const ID = "000";
const changepassword = true;

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getID() {
  return Cookies.get(ID);
}

export function setID(id) {
  return Cookies.set(ID, id);
}

export function removeID() {
  return Cookies.remove(ID);
}

export function getChangepassword() {
  return Cookies.get(changepassword);
}

export function setChangepassword(state) {
  return Cookies.set(changepassword, state);
}

export function removeChangepassword() {
  return Cookies.remove(changepassword);
}
