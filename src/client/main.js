'use strict';

import Ractive from 'ractive';

import template from './main.html';

function MainCtrl() {

  this.viewData = {};
}

export default function (el) {
  var controller = new MainCtrl();

  new Ractive({
    el: el,
    template: template,
    data: controller.viewData
  });

  return controller;
}

export {MainCtrl};
