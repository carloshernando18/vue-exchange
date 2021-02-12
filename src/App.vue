<template>
  <main>
    <app-header :links="links" />

    <router-view class="cotainer px-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
  },

  data() {
    return {
      links: [
        {
          title: 'BTC',
          to: { name: 'coin-detail', params: { id: 'bitcoin' } },
        },
        {
          title: 'ETH',
          to: { name: 'coin-detail', params: { id: 'ethereum' } },
        },
        {
          title: 'BSV',
          to: { name: 'coin-detail', params: { id: 'bitcoin-sv' } },
        },
        {
          title: 'XRP',
          to: { name: 'coin-detail', params: { id: 'xrp' } },
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
