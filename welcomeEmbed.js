const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require('discord.js');
const informationText = require('./informationText.js'); // Pastikan penamaan dan path sudah sesuai

function getWelcomeImageEmbed() {
  return new EmbedBuilder()
    .setImage("https://cdn.discordapp.com/attachments/1338521158839963728/1377558402221473802/Black_Abstract_Texture_Zoom_Virtual_Background.png.png?ex=683966bc&is=6838153c&hm=ceebb480ba9558856530a0f938d16ed47dfd9bbdce645d09986612e9258a0864&")
    .setColor(0x00ff99);
}

function getWelcomeTextEmbed(onlineUsernames = []) {
  let description = 
`✨ **Selamat datang di Growtopia Discord Bot!** ✨

🎮 _Tempat komunitas Growtopia berkumpul, berbagi, dan bermain bersama!_

Silakan pilih menu di bawah untuk:
• 🔐 **Register:** Daftarkan akun Growtopia-mu
• 🔑 **Login:** Masuk & tampil di daftar online
• ℹ️ **Informasi:** Lihat fitur & bantuan bot

${onlineUsernames.length > 0 
  ? (onlineUsernames.length <= 9
      ? `\n👥 **Teman Online Saat Ini:**\n${onlineUsernames.map(u => `> ${u}`).join('\n')}`
      : `\n👥 **${onlineUsernames.length} pemain sedang online!**\n_Join dan ramaikan komunitas!_`)
  : '\n🌱 **Belum ada yang online. Jadilah yang pertama hari ini!**'
}

────────────────────────────
⏳ **Tips:** Jangan lupa aktifkan notifikasi agar tidak ketinggalan event atau info penting dari komunitas!
`;

  return new EmbedBuilder()
    .setTitle("Growtopia Discord Community")
    .setDescription(description)
    .setColor(0x00ff99);
}

function getWelcomeButtons() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('mulai')
        .setLabel('Mulai')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('register')
        .setLabel('Register')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('login')
        .setLabel('Login')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('informasi')
        .setLabel('Informasi')
        .setStyle(ButtonStyle.Secondary)
    )
  ];
}

function getInfoImageEmbed() {
  return new EmbedBuilder()
    .setImage("https://cdn.discordapp.com/attachments/1338521158839963728/1377558402577731624/Black_Abstract_Texture_Zoom_Virtual_Background.png.png?ex=683966bc&is=6838153c&hm=f5960cf6ee5bf6254a4f172b89a2a95a2902ef5ea2d678fd37210edf4f373efd&")
    .setColor(0x0088ff);
}

function getInfoTextEmbed() {
  return new EmbedBuilder()
    .setTitle("Tentang Growtopia Bot")
    .setDescription(informationText) // PAKAI dari file informationText.js
    .setColor(0x0088ff);
}

function getBackButton() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('back')
        .setLabel('Back')
        .setStyle(ButtonStyle.Danger)
    )
  ];
}

function getRegisterModal() {
  return new ModalBuilder()
    .setCustomId('registerModal')
    .setTitle('Register Growtopia')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('registerUsername')
          .setLabel('Username')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('registerPassword')
          .setLabel('Password')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
      )
    );
}

function getLoginModal() {
  return new ModalBuilder()
    .setCustomId('loginModal')
    .setTitle('Login Growtopia')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('loginUsername')
          .setLabel('Username')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('loginPassword')
          .setLabel('Password')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
      )
    );
}

module.exports = {
  getWelcomeImageEmbed,
  getWelcomeTextEmbed,
  getWelcomeButtons,
  getInfoImageEmbed,
  getInfoTextEmbed,
  getBackButton,
  getRegisterModal,
  getLoginModal
};
