import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return AsyncStorage.getItem(`${this.namespace}:accessToken`);
  }

  async setAccessToken(accessToken) {
    return AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  }

  async removeAccessToken() {
    return AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;
