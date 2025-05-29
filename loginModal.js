const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

function showLoginModal(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('login-modal')
    .setTitle('Login Growtopia');

  const usernameInput = new TextInputBuilder()
    .setCustomId('login-username')
    .setLabel("Username")
    .setStyle(TextInputStyle.Short)
    .setMinLength(3)
    .setMaxLength(20)
    .setPlaceholder("Masukkan username")
    .setRequired(true);

  const passwordInput = new TextInputBuilder()
    .setCustomId('login-password')
    .setLabel("Password")
    .setStyle(TextInputStyle.Short)
    .setMinLength(4)
    .setMaxLength(20)
    .setPlaceholder("Masukkan password")
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder().addComponents(usernameInput),
    new ActionRowBuilder().addComponents(passwordInput)
  );

  return interaction.showModal(modal);
}

module.exports = { showLoginModal };
