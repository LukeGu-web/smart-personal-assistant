export function setToken(userToken: string) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem('token') as string;
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
