// imports
import EventService from "@/services/EventService";
const state = {
  totalEvents: undefined,
  perPage: 3,
  events: [],
  event: {},
};

const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_TOTAL_EVENTS(state, totalEvents) {
    state.totalEvents = totalEvents;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

const actions = {
  createEvent({ commit, dispatch }, event) {
    EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);

        const notification = {
          type: "success",
          message: "Successfully added event ",
        };
        //   dispatch notification now
        dispatch("notification/add", notification, { root: true }); // root: true is needed to access the notification module
      })
      .catch((err) => {
        const notification = {
          type: "error",
          message: "There was a problem creating event: " + err.message,
        };
        //   dispatch notification now
        dispatch("notification/add", notification, { root: true }); // root: true is needed to access the notification module
        throw err;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((events) => {
        commit("SET_EVENTS", events.data);
        commit("SET_TOTAL_EVENTS", events.headers["x-total-count"]);
        return events;
      })
      .catch((err) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + err.message,
        };
        //   dispatch notification now
        dispatch("notification/add", notification, { root: true }); // root: true is needed to access the notification module
      });
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    const event = getters.getEventByID(id);
    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEvent(id)
        .then((event) => {
          console.log(event.data);
          commit("SET_EVENT", event.data);
          return event.data;
        })
        .catch((err) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching events: " + err.message,
          };
          //   dispatch notification now
          dispatch("notification/add", notification, { root: true }); // root: true is needed to access the notification module
        });
    }
  },
};

const getters = {
  getEventByID: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};

// export
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
