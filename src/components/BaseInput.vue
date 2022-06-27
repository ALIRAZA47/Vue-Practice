<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      v-on="listeners"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="updateValue"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin.js";
export default {
  mixins: [formFieldMixin],
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style scoped></style>
