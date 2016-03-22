import { browserHistory } from 'react-router'


const Auth = {
  isLoggedIn: () => {
    return document.cookie.indexOf('userid') >= 0
  },

  logOut: () => {
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  getUserId: function () {
    return document.cookie.split("=")[1];
  }
}

export default Auth;
