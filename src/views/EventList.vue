<template>
  <div>
    <h1>Event for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }">
        Previous |
      </router-link>
    </template>
    <template v-if="hasNextPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }">
        Next
      </router-link></template
    >
  </div>
</template>
<script>
import EventCard from "@/components/EventCard.vue";
import store from "@/store";
import { mapState } from "vuex";
export default {
  components: {
    EventCard,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    const currentPage = parseInt(to.query.page) || 1;
    store.dispatch("event/fetchEvents", { page: currentPage }).then(() => {
      to.params.page = currentPage;
      next();
    });
  },
  beforeRouteUpdate(to, from, next) {
    const currentPage = parseInt(to.query.page) || 1;
    store.dispatch("event/fetchEvents", { page: currentPage }).then(() => {
      to.params.page = currentPage;
      next();
    });
  },
  computed: {
    ...mapState({
      event: "event",
      user: "user",
    }),
    hasNextPage() {
      return this.event.totalEvents > this.page * this.event.perPage;
    },
  },
};
</script>
