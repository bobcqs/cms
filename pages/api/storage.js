export function setAuthData(data) {
    localStorage.setItem("authData", JSON.stringify(data));
  }
  
  export function getAuthData() {
    if (typeof localStorage === "object") {
      return JSON.parse(localStorage.getItem("authData"));
    }
  }
  
  export function removeAuthData() {
    localStorage.removeItem("authData");
  }
  