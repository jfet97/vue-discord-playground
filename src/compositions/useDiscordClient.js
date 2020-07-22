import { ref } from "vue"

export function useDiscordClient(token) {

  // create new discord client
  const client = new Discord.Client();

  // all the messages
  const messages = ref([]);

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', (msg) => {
    if (msg.content.length > 0) {
      this.messages.value.push(msg);
    }
  });

  client.login(token);

  return (
    {
      messages
    }
  )
}