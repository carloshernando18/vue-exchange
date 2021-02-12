<template>
  <table aria-describedby="exchange-table">
    <thead>
      <tr class="bg-indigo-100 border-b-2 border-indigo-400">
        <th scope="col"></th>
        <th
          scope="col"
          :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }"
        >
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Cap. de Mercado</th>
        <th scope="col">Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-indigo-100 focus:outline-none border-b border-indigo-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-indigo-200 hover:bg-gray-100 hover:bg-indigo-100"
        v-for="asset in filteredAssets"
        :key="asset.id"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.id"
          />
        </td>
        <td>#{{ asset.rank }}</td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: asset.id } }"
          >
            {{ asset.name }}
          </router-link>
          <small class="ml-1 text-gray-500">{{ asset.symbol }}</small>
        </td>
        <td>{{ asset.priceUsd | dollar }}</td>
        <td>{{ asset.marketCapUsd | dollar }}</td>
        <td
          :class="
            asset.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ asset.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <app-button @onClick="goToCoin(asset.id)">
            <span>Detalle</span>
          </app-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppButton from '@/components/AppButton';

export default {
  name: 'AppAssetstable',

  components: {
    AppButton,
  },

  data() {
    return {
      filter: '',
      sortOrder: 1,
    };
  },

  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    filteredAssets() {
      return this.assets
        .filter(
          asset =>
            asset.name.toLowerCase().includes(this.filter.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((anterior, siguiente) => {
          if (parseInt(anterior.rank) > parseInt(siguiente.rank)) {
            return this.sortOrder;
          }
          return this.sortOrder === 1 ? -1 : 1;
        });
    },
  },

  methods: {
    goToCoin(id) {
      this.$router.push({ name: 'coin-detail', params: { id } });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    },
  },
};
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
