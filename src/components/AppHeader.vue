<template>
  <header class="shadow w-screen">
    <nav aria-label="navbar">
      <nav
        aria-label="navbar"
        class="flex items-center justify-between flex-wrap bg-indigo-900 p-6"
      >
        <div class="flex items-center flex-shirink-0 text-white mr-6">
          <app-icon class="mr-4" />
          <router-link
            class="font-semibold text-xl tracking-tight"
            :to="{ name: 'home' }"
          >
            Calidoso</router-link
          >
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto "
        >
          <div class="text-sm lg:flex-grow">
            <router-link
              v-for="link in links"
              :key="link.title"
              :to="link.to"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >{{ link.title }}</router-link
            >
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import AppIcon from '@/components/AppIcon';

export default {
  name: 'AppHeader',
  components: {
    AppIcon,
  },

  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
