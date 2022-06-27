<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-on="listeners" :value="value" @input="updateValue">
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin.js";
export default {
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  props: {
    value: {
      type: String,
    },
    options: {
      type: [Array],
      required: true,
    },
  },
};
</script>

<style scoped></style>
