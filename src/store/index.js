import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import event from "./modules/event";
import notification from "./modules/notification";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification,
  },
  state: {
    pageLimit: undefined,
    events: [],
    categories: [
      "sustainablitiy",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "community",
      "food",
    ],
  },
});
