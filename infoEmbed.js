const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { createEmbed, colors } = require('../../utils/embedUtil');

function getInfoEmbed() {
  return createEmbed({
    title: "Informasi Bot Growtopia",
    description: "Bot ini adalah simulasi aplikasi Growtopia di Discord. Anda dapat register, login, dan memulai permainan layaknya game aslinya.\n\nFitur-fitur akan ditambahkan secara bertahap.",
    color: colors.infoColor
  });
}

function getInfoButtons() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('back')
        .setLabel('Back')
        .setStyle(ButtonStyle.Secondary)
    )
  ];
}

module.exports = {
  getInfoEmbed,
  getInfoButtons
};
