const { SlashCommandBuilder } = require('discord.js');
const ttsPlayer = require('../utils/ttsPlayer.js')
const ttsEnsure = require('../utils/ttsEnsure.js')

const characterLimit = 600

module.exports = {
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('polly')
        .setDescription('Send a Polly */voice* TTS message in your current voice channel')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Your TTS message')
                .setRequired(true)),
    async execute(interaction) {
        const phrase = interaction.options.getString('message');

        const err = await ttsEnsure(interaction, phrase, characterLimit)
        if (err) return interaction.reply(err)
        ttsPlayer.polly(interaction.guild.id, phrase, interaction.query.voice)
    },
};
