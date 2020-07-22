<template>
  <div class="flex flex-col p-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-xl font-bold mb-2">
        Enter discord token to get started:
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="token"
        type="password"
        placeholder="Discord token"
      />
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
      v-on:click="saveToken"
    >
      Save and start client
    </button>
  </div>
</template>

<script>
export default {
  name: 'Config',
  data() {
    return {
      token: '',
    };
  },
  methods: {
    saveToken() {
      localStorage.setItem('token', this.token);
      this.$emit('tokenSave');
    },
  },
};
</script>
