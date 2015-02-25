'use strict';

import cookie from 'cookie';
import request from 'browser-request';

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
        body: { refresh_token: this.auth.refresh_token }
      }, (err, response, body) => {
        if (err) {
          reject(err);
          return;
        }

        this.auth = body;
        document.cookie = 'flowauth=' + JSON.stringify(this.auth);
        resolve();
      });
    });
  }
}

export default new FlowdockAuth();
