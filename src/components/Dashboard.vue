<template>
  <div class="flex flex-col p-4">
    <h1 class="text-3xl">Dashboard</h1>
    <div
      class="flex flex-col border border-1 overflow-auto"
      style="max-height: 50vh;"
    >
      <h2 class="text-2xl font-bold m-2">Latest messages</h2>
      <div
        class="flex p-2 items-center"
        v-for="message in messages"
        :key="message.id"
      >
        <span class="mr-2 text-sm text-gray-500">{{
          new Date(message.createdTimestamp).toLocaleString()
        }}</span>
        <span class="text-lg">{{ message.content }}</span>
      </div>
    </div>
    <div class="flex flex-col mt-4 p-2">
      <textarea
        class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Code"
        v-model="code"
      ></textarea>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        v-on:click="executeCode"
      >
        Execute
      </button>
      <div class="flex flex-col">
        <h3 class="text-xl font-semibold">Output:</h3>
        <div class="text-left">
          <pre>{{ output }}</pre>
          <pre>{{ immediateOutput }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import saferEval from 'safer-eval';
import { reactive, computed, watchEffect } from 'vue';

// create new discord client
const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

export default {
  name: 'Dashboard',
  setup() {
    const messages = [];
    const code = reactive('');
    const output = '';
    const immediateOutput = '';

    return { messages, code, output, immediateOutput };
  },
  mounted() {
    // get token from localstorage
    const token = localStorage.getItem('token');
    client.on('message', (msg) => {
      if (msg.content.length > 0) {
        this.messages.push(msg);
      }
    });
    client.login(token);

    watchEffect(() => {
      try {
        const res = saferEval(this.code, { client });
        this.immediateOutput = JSON.stringify(res, null, 2);
      } catch (err) {
        this.immediateOutput = JSON.stringify(err, null, 2);
      }
    });
  },
  methods: {
    executeCode() {
      const res = saferEval(this.code, { client });
      this.output = JSON.stringify(res, null, 2);
    },
  },
};
</script>
