const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

function showRegisterModal(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('register-modal')
    .setTitle('Register Growtopia');

  const usernameInput = new TextInputBuilder()
    .setCustomId('register-username')
    .setLabel("Username")
    .setStyle(TextInputStyle.Short)
    .setMinLength(3)
    .setMaxLength(20)
    .setPlaceholder("Masukkan username")
    .setRequired(true);

  const passwordInput = new TextInputBuilder()
    .setCustomId('register-password')
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

module.exports = { showRegisterModal };
