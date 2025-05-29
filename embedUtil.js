const { EmbedBuilder } = require('discord.js');
const { embedColor, infoColor, successColor, errorColor } = require('../config');

function createEmbed({ title, description, color = embedColor, fields = [], footer = "" }) {
  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title || "")
    .setDescription(description || "");
  if (fields.length > 0) embed.addFields(fields);
  if (footer) embed.setFooter({ text: footer });
  return embed;
}

module.exports = {
  createEmbed,
  colors: { embedColor, infoColor, successColor, errorColor }
};
