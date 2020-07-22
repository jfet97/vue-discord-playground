<template>
  <Config @tokenSave="onToken" v-if="!hasToken" />
  <Dashboard v-if="hasToken" />
</template>

<script>
import Config from './components/Config.vue';
import Dashboard from './components/Dashboard.vue';

export default {
  name: 'App',
  setup() {
    const hasToken = localStorage.getItem('token')?.length > 0;

    return {
      hasToken,
    };
  },
  methods: {
    onToken() {
      this.hasToken = true;
    },
  },
  components: {
    Config,
    Dashboard,
  },
};
</script>
