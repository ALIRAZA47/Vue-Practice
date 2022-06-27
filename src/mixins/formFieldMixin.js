export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
    },
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    },
  },
};
