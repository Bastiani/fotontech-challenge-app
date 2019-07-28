import { AsyncStorage } from 'react-native';

import { LOCAL_STORAGE } from './consts';

export async function getToken() {
  return AsyncStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
}

export async function isLoggedIn() {
  return !!getToken();
}

export async function setToken(token: string) {
  await AsyncStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
}

export async function removeToken() {
  await AsyncStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
}

export function logout() {
  Object.keys(LOCAL_STORAGE).map(key =>
    AsyncStorage.removeItem(LOCAL_STORAGE[key])
  );
}
