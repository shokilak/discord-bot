require('dotenv/config')
const test = require('./src/commands')

const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,

        "DIRECT_MESSAGES"
    ] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', (message) => {
    if (message.content === 'ping'){
        message.reply({
            content: 'pong'
        })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply('User info.');
    }
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);

