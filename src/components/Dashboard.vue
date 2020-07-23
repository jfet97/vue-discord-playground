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
        v-for="message in discordMessagesRef"
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
        v-model="codeRef"
      ></textarea>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="onExecuteClick"
      >
        Execute
      </button>
      <div class="flex flex-col">
        <h3 class="text-xl font-semibold">Immediate Output:</h3>
        <div class="text-left">
          <pre>{{ immediateOutputRef }}</pre>
        </div>
        <h3 class="text-xl font-semibold">Output:</h3>
        <div class="text-left">
          <pre>{{ outputRef }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useDiscordClient } from "../compositions/useDiscordClient"
import { useSaferEval } from "../compositions/useSaferEval"

export default {
  name: 'Dashboard',
  setup() {

    // discord setup
    const token = localStorage.getItem('token');
    const { discordMessagesRef, discordClient } = useDiscordClient(token)

    // code setup
    const codeRef = ref('');
    const { evaluatedCodeRef } = useSaferEval(codeRef, { client: discordClient })

    // output setup
    const outputRef = ref('');
    const immediateOutputRef = evaluatedCodeRef

    function updateOutputRef(value) {
      outputRef.value = value
    }

    // execution stuff
    function onExecuteClick() {
      updateOutputRef(evaluatedCodeRef.value)
    }

    return { discordMessagesRef, codeRef, outputRef, immediateOutputRef, onExecuteClick };
  },
};
</script>
