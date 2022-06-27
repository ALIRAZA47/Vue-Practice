<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <!-- <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select> -->

      <BaseSelect
        label="Select a category"
        v-model="event.category"
        :options="categories"
        :class="{ error: true }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p class="error" v-if="!$v.event.category.required">
          Category is required
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        class="field"
        label="Title"
        placeholder="Add an event title"
        v-model="event.title"
        :class="{ error: true }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p class="error" v-if="!$v.event.title.required">Title is required</p>
      </template>

      <BaseInput
        class="field"
        label="Description"
        placeholder="Add a description"
        v-model="event.description"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p class="error" v-if="!$v.event.description.required">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        class="field"
        label="Location"
        placeholder="Add a location"
        v-model="event.location"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p class="error" v-if="!$v.event.location.required">
          Description is required
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
        />
        <template v-if="$v.event.date.$error">
          <p class="error" v-if="!$v.event.date.required">Date is required</p>
        </template>
      </div>

      <BaseSelect
        class="field"
        label="Select a time"
        v-model="event.time"
        :options="times"
        :class="{ error: true }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p class="error" v-if="!$v.event.time.required">Time is required</p>
      </template>
      <!-- <BaseInput type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton
        :disabled="$v.$anyError"
        type="submit"
        buttonClass="-fill-gradient"
        >Submit</BaseButton
      >
      <p class="errorMessage" v-if="$v.$anyError">
        Please fill out required field (s)
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Datepicker,
  },
  data() {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEvent(),
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    createFreshEvent() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        id: id,
        user: user,
        organizer: user,
        atendees: [],
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        category: "",
      };
    },
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            this.createFreshEvent();
            this.$router.push({
              name: "event-show",
              params: {
                eventId: this.event.id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            NProgress.done();
          });
      } else {
        console.log("error");
      }
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.error {
  border-color: red;
  color: red;
}
</style>
