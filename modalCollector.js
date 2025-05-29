const { handleRegisterModal } = require('../../features/auth/register');
const { handleLoginModal } = require('../../features/auth/login');
const { getWelcomeEmbed, getWelcomeButtons } = require('../../features/welcome/welcomeEmbed');

async function handleModalSubmit(interaction, client) {
  if (interaction.customId === 'register-modal') {
    await handleRegisterModal(interaction);
  } else if (interaction.customId === 'login-modal') {
    await handleLoginModal(interaction);

    // Setelah login berhasil, update embed utama untuk user (jika memungkinkan)
    // Harus di-trigger secara manual dari flow bot yang memanggil modal login
    // (Biasanya user harus klik tombol Mulai lagi atau refresh embed utama)
    // Bisa juga lakukan di message channel jika ingin auto-update (advance)
  }
}

module.exports = { handleModalSubmit };
