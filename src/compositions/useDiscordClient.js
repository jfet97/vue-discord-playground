import { ref } from "vue"

export function useDiscordClient(token) {

  // create new discord client
  const discordClient = new Discord.Client();

  // all the messages
  const discordMessagesRef = ref([]);

  discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
  });

  discordClient.on('message', (msg) => {
    if (msg.content.length > 0) {
      discordMessagesRef.value.push(msg);
    }
  });

  discordClient.login(token);

  return (
    {
      discordMessagesRef,
      discordClient
    }
  )
}