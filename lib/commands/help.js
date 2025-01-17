const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed } = require("discord.js");
const { embed } = require('../utils/constants.js')

const knownCommands = ['help', 'voices', 'langs', 'polly', 'google', 'voice', 'lang', 'join', 'leave', 'skip', 'ping']

module.exports = {
    cooldown: 8,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("DM's you the command list"),
    execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle("List of available commands")
            .setColor(embed.color)
            .setThumbnail('https://cdn.donmai.us/original/d8/f4/__monobeno_drawn_by_cura__d8f4007a85c7d152d1002e8346cedf10.jpg')

        for (let i = 0, len = knownCommands.length; i < len; i++) {
            const command = interaction.client.commands.get(knownCommands[i])
            helpEmbed.addFields({ name: `\u200b`, value: `**/${command.data.name.toUpperCase()}** - ${command.data.description}\n __Cooldown__: ${command.cooldown ?? '0'}s` })
        }

        interaction.user.send({ embeds: [helpEmbed] })
            .catch((e) => {
                if (e == "DiscordAPIError: Cannot send messages to this user") {
                    interaction.reply({
                        content: "You have to allow direct messages from server members in order to DM you the command list",
                        ephemeral: true
                    })
                } else {
                    throw e;
                }
            });

        interaction.reply({
            content: "Check your DMs!",
            ephemeral: true
        })
    },
};
