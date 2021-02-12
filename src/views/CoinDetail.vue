<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'indigo'" :size="700" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <strong class="text-gray-600 mr-10 uppercase">Ranking</strong>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <strong class="text-gray-600 mr-10 uppercase"
                >Precio actual</strong
              >
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <strong class="text-gray-600 mr-10 uppercase"
                >Precio más bajo</strong
              >
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <strong class="text-gray-600 mr-10 uppercase"
                >Precio más alto</strong
              >
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <strong class="text-gray-600 mr-10 uppercase"
                >Precio Promedio</strong
              >
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <strong class="text-gray-600 mr-10 uppercase"
                >Variación 24hs</strong
              >
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConvert"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `BTC a ${asset.symbol}` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>

          <span class="text-xl">
            {{ convertResult }}
            {{ fromUsd ? asset.symbol : 'USD' }}</span
          >
        </div>
      </div>

      <line-chart
        class="mt-10"
        :colors="['indigo']"
        :min="min"
        :max="max"
        :data="
          history.map(element => [
            element.date,
            parseFloat(element.priceUsd).toFixed(2),
          ])
        "
      />

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr
          v-for="market in markets"
          :key="`${market.exchangeId} - ${market.priceUsd}`"
          class="border-b"
        >
          <td>
            <strong>{{ market.exchangeId }}</strong>
          </td>
          <td>{{ market.priceUsd | dollar }}</td>
          <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
          <td>
            <app-button
              :is-loading="market.isLoading || false"
              v-if="!market.url"
              @onClick="getWebsites(market)"
            >
              <slot>Obtner Link</slot>
            </app-button>
            <a
              class="hover:underline text-indigo-600"
              :href="market.url"
              target="_blank"
            >
              {{ market.url }}
            </a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from '@/api';
import AppButton from '@/components/AppButton.vue';

export default {
  components: { AppButton },
  name: 'CoinDetail',

  data() {
    return {
      asset: {},
      history: [],
      isLoading: false,
      markets: [],
      fromUsd: true,
      convertValue: null,
    };
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      console.log(this.fromUsd);
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;
      return result.toFixed(2);
    },

    min() {
      return Math.min(
        ...this.history.map(element => parseFloat(element.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map(element => parseFloat(element.priceUsd).toFixed(2))
      );
    },

    avg() {
      const total = this.history.reduce(
        (a, b) => Number(a) + Number(b.priceUsd),
        0
      );
      return total / this.history.length;
    },
  },

  watch: {
    $route() {
      this.getCoin();
    },
  },

  created() {
    this.isLoading = true;
    this.getCoin();
  },

  methods: {
    toggleConvert() {
      this.fromUsd = !this.fromUsd;
    },

    getWebsites(exchange) {
      this.$set(exchange, 'isLoading', true);
      return api
        .getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, 'url', res.exchangeUrl);
        })
        .finally(() => {
          this.$set(exchange, 'isLoading', false);
        });
    },

    getCoin() {
      const id = this.$route.params.id;
      Promise.all([
        api.getAsset(id),
        api.getAssestHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));

      api.getAsset(id).then(asset => (this.asset = asset));
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
