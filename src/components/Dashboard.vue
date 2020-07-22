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
        v-for="message in discordMessages"
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
        @click="executeCode"
      >
        Execute
      </button>
      <div class="flex flex-col">
        <h3 class="text-xl font-semibold">Output:</h3>
        <div class="text-left">
          <pre>{{ output }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import saferEval from 'safer-eval';
import { ref, computed } from 'vue';
import { useDiscordClient } from "../compositions/useDiscordClient"


export default {
  name: 'Dashboard',
  setup() {

    // discord setup
    const token = localStorage.getItem('token');
    const { messages: discordMessages, client } = useDiscordClient(token)

    // code setup
    const code = ref('');

    // output setup
    const output = ref('');

    function executeCode() {
      try {
        const res = saferEval(code.value, { client });
        output.value = (JSON.stringify(res, null, 2));
      } catch (err) {
        output.value = (`ERROR:  ${JSON.stringify(err, null, 2)}`);
      }
    }

    return { discordMessages, client, code, output, executeCode };
  },
};
</script>
