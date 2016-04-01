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
    var value = "; " + document.cookie;
    var parts = value.split("; " + 'userid' + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  },

  getUserImage: function () {
    var value = "; " + document.cookie;
    var parts = value.split("; " + 'user_img' + "=");
    if (parts.length == 2) return decodeURIComponent(parts.pop().split(";").shift());
  },

  getUserName: function() {
    var value = "; " + document.cookie;
    var parts = value.split("; " + 'user_name' + "=");
    if (parts.length == 2) return decodeURIComponent(parts.pop().split(";").shift());
  }
}

export default Auth;
