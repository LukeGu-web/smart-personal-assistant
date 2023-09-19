export function setToken(userToken: string) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem('token') as string;
  return tokenString;
}
