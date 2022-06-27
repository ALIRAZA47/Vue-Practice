const state = {
  notifications: [],
};

let id = 1;
const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      id: id++,
      ...notification,
    });
  },
  DELETE(state, notificationToDeleted) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToDeleted.id
    );
  },
};
const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },
  remove({ commit }, notificationToDeleted) {
    commit("DELETE", notificationToDeleted);
  },
};

// export
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
