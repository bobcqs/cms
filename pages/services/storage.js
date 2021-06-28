export function setUserData(data) {
  localStorage.setItem("key", JSON.stringify(data));
}

export function getUserData() {
  // if (typeof localStorage === "object")  的条件是bypass next的原生的function。
  if (typeof localStorage === "object") {
    return JSON.parse(localStorage.getItem("key"));
  }
}

export function removeUserData() {
  localStorage.removeItem("key");
}