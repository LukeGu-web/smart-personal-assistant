import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../types';

export function setToken(userToken: string) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem('token') as string;
  return tokenString;
}

export function cleanToken() {
  localStorage.removeItem('token');
}

export function getTokenDecode() {
  const token = getToken();
  if (token) {
    return jwt_decode(token);
  }
  return null;
}

export function getIsAuth() {
  const decoded = getTokenDecode() as DecodedToken;
  let isAuth = false;
  if (decoded) {
    isAuth = decoded.exp * 1000 > Date.now();
  }
  return isAuth;
}

export function getAvatar() {
  const decoded = getTokenDecode() as DecodedToken;
  let name = '';
  if (decoded) {
    name = decoded.firstname.charAt(0) + decoded.lastname.charAt(0);
  }
  return name.toUpperCase();
}
