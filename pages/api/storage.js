export function setAuthData(data) {
  window.localStorage.setItem('user', JSON.stringify(data));
  }
  
export function getAuthData() {
  JSON.parse(window.localStorage.getItem('user'));
}

  