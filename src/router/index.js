import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import NProgress from "nprogress";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true,
  },
  {
    path: "/event/:eventId",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(to, from, next) {
      store
        .dispatch("event/fetchEvent", to.params.eventId)
        .then((event) => {
          to.params.event = event;
          next();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
