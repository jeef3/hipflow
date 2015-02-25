'use strict';

import cookie from 'cookie';

class FlowdockAuth {

  constructor() {
    var cookies = cookie.parse(document.cookie);
    this.auth = JSON.parse(cookies.flowauth) || {};
  }

  isAuthenticated() {
    try {
      var cookies = cookie.parse(document.cookie);
      this.auth = JSON.parse(cookies.flowauth);
    } catch (err) {
      return false;
    }

    return !!this.auth.access_token;
  }

  logout() {
    // TODO: expire the auth cookie
  }

  token() {
    return this.auth.access_token;
  }

  refreshToken() {
    return new Promise((resolve, reject) => {
      request({
        url: '/oauth/refresh',
        method: 'POST',
        json: true,
        body: { refresh_token: auth.refresh_token }
      }, (err, response, body) => {
        this.auth = body;
        document.cookie = 'flowauth=' + JSON.stringify(this.auth);
      });
    });
  }
}

export default new FlowdockAuth();
