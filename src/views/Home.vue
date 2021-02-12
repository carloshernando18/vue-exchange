<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'indigo'" :size="700" />
    <app-assetstable :assets="assets" v-if="!isLoading" />
  </div>
</template>

<script>
import Api from '@/api';
import AppAssetstable from '@/components/AppAssetstable';

export default {
  name: 'Home',
  components: {
    AppAssetstable,
  },

  data() {
    return {
      assets: [],
      isLoading: false,
    };
  },

  created() {
    this.isLoading = true;
    Api.getAssets()
      .then(data => (this.assets = data))
      .finally(() => (this.isLoading = false));
  },
};
</script>
