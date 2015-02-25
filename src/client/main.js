'use strict';

import Ractive from 'ractive';

import template from './main.html';

class MainCtrl {
  constructor() {
    this.viewData = {
      currentRoomId: 1
    };
  }
}

export default function (el) {
  var controller = new MainCtrl();

  new Ractive({
    el,
    template,
    data: controller.viewData
  });

  return controller;
}

export {MainCtrl};
