const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong! 🏓'),
    execute(interaction) {
        interaction.reply(`Pong! 🏓`)
    },
};
