import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
global.localStorage = new LocalStorageMock();

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

// Mock the request issued by the react app to get the client configuration parameters.
window.fetch = () => {
    return Promise.resolve(
        {
            ok: true,
            json: () => Promise.resolve({
                "authority": "https://localhost:5001",
                "client_id": "Assistant",
                "redirect_uri": "https://localhost:5001/authentication/login-callback",
                "post_logout_redirect_uri": "https://localhost:5001/authentication/logout-callback",
                "response_type": "id_token token",
                "scope": "AssistantAPI openid profile"
            })
        });
};