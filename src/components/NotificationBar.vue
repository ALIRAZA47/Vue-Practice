<template>
  <div class="notification-bar" :class="notificationType">
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapActions("notification", ["remove"]),
  },

  computed: {
    notificationType() {
      return `-text-${this.notification.type}`;
    },
  },
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
