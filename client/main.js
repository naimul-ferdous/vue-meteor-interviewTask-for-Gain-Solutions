import { Meteor } from "meteor/meteor";
import Vue from "vue";

import VueMeteorTracker from "vue-meteor-tracker";

import VModal from "vue-js-modal";

Vue.use(VueMeteorTracker);

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true,
  dynamicDefaults: { clickToClose: true },
});

import App from "../imports/ui/App.vue";

Meteor.startup(() => {
  new Vue({
    ...App,
  }).$mount("#app");
});
