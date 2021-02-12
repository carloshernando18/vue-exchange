<template>
  <button
    @click="onClick"
    class="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-2 border border-purple-500 hover:border-transparent rounded"
  >
    <beat-loader :loading="isLoading" :color="'indigo'" :size="30" />
    <p v-show="!isLoading">
      <slot></slot>
    </p>
  </button>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>
