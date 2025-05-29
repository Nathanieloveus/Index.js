const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const {
  getWelcomeImageEmbed,
  getWelcomeTextEmbed,
  getInfoImageEmbed,
  getInfoTextEmbed,
  getWelcomeButtons,
  getBackButton,
  getRegisterModal,
  getLoginModal
} = require('./features/welcome/welcomeEmbed');

const {
  addOnlineUser,
  getOnlineUsernames,
  addEmbedMessage,
  getEmbedMessages
} = require('./onlineManager');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Bot ready as ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === '!growtopia') {
    // Kirim 2 embed: gambar & teks
    const imageEmbed = getWelcomeImageEmbed();
    const textEmbed = getWelcomeTextEmbed(getOnlineUsernames());
    const sent = await msg.channel.send({ embeds: [imageEmbed, textEmbed], components: getWelcomeButtons() });
    // Simpan pesan embed utama (untuk update massal)
    addEmbedMessage(msg.channel.id, sent.id);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'informasi') {
      // Ganti ke visual informasi: gambar info & text info
      await interaction.update({ 
        embeds: [getInfoImageEmbed(), getInfoTextEmbed()], 
        components: getBackButton() 
      });
    }
    else if (interaction.customId === 'back') {
      // Kembali ke welcome 2 embed
      const imageEmbed = getWelcomeImageEmbed();
      const textEmbed = getWelcomeTextEmbed(getOnlineUsernames());
      await interaction.update({ 
        embeds: [imageEmbed, textEmbed], 
        components: getWelcomeButtons() 
      });
    }
    else if (interaction.customId === 'register') {
      await interaction.showModal(getRegisterModal());
      // Tidak ada update embed di sini!
    }
    else if (interaction.customId === 'login') {
      await interaction.showModal(getLoginModal());
    }
    else if (interaction.customId === 'mulai') {
      await interaction.reply({ content: 'Mohon maaf, bot ini masih dalam pengembangan, mohon tunggu yaâ˜ºï¸ ', ephemeral: true });
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'registerModal') {
      const username = interaction.fields.getTextInputValue('registerUsername');
      await interaction.reply({ content: `Anda telah berhasil register sebagai **${username}**!`, ephemeral: true });
      // Tidak ada update embed di sini!
    }
    if (interaction.customId === 'loginModal') {
      const username = interaction.fields.getTextInputValue('loginUsername');
      addOnlineUser(username);

      // Balas interaction secepatnya (defer dulu)
      await interaction.deferReply({ ephemeral: true });

      // Update semua embed utama di semua channel
      const embedMessages = getEmbedMessages();
      const onlineUsernames = getOnlineUsernames();
      for (const { channelId, messageId } of embedMessages) {
        try {
          const channel = await client.channels.fetch(channelId);
          if (!channel) continue;
          const message = await channel.messages.fetch(messageId);
          if (!message) continue;
          const imageEmbed = getWelcomeImageEmbed();
          const textEmbed = getWelcomeTextEmbed(onlineUsernames);
          await message.edit({ embeds: [imageEmbed, textEmbed], components: getWelcomeButtons() });
        } catch (e) {
          // Pesan mungkin sudah dihapus, atau channel tidak bisa diakses
          // Lewati saja
        }
      }

      // Edit balasan interaction
      await interaction.editReply({ content: `Anda berhasil login sebagai **${username}**!` });
    }
  }
});

client.login(process.env.BOT_TOKEN);
