const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json'); //imports token from a json file
const { REST, Routes } = require('discord.js');

const CLIENT_ID = ""
const GUILD_ID = ""

const rest = new REST({ version: 10}).setToken(token);

//fresh client instance
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent'] });

client.login(token);

client.once(Events.ClientReady, c =>{
    console.log(`Logged in as ${c.user.tag}. Ready.`); //our readying message
});

client.on(Events.MessageCreate, (message) => {
    console.log(message.author.tag, `in channel:`, message.channel.name, `-- `, `"`, message.content, `"`);
});

client.on(Events.InteractionCreate, async interaction => {
    //register some basic command resolution
    //registering local commands against the guild happens in a separate one-time function
    if (interaction.commandName === 'ping'){
        await interaction.reply('pong~!');
    }

    if (interaction.commandName === 'talk'){
        await interaction.reply('bark!');
    }
});

const commands = [ //set a description to be displayed in the contextual menu for users who need more explanation
    {
    name: 'ping',
    description: 'Replies with Pong!',
    },
    {
    name: 'talk',
    description: 'Replies with a bark',
    }
]

async function main (){
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  main();