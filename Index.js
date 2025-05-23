
const { Client, GatewayIntentBits, Partials, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const CHANNEL_ID = '1332569479401701457';

client.once('ready', () => {
  console.log(`Bot online sebagai ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'kirimSurat') {
      const modal = new ModalBuilder()
        .setCustomId('formSuratCinta')
        .setTitle('💌 Kirim Surat Cinta');

      const isiSurat = new TextInputBuilder()
        .setCustomId('isiSurat')
        .setLabel('Isi Surat')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const pengirim = new TextInputBuilder()
        .setCustomId('pengirim')
        .setLabel('Nama Pengirim (Opsional)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const penerima = new TextInputBuilder()
        .setCustomId('penerima')
        .setLabel('Nama atau ID Penerima (Opsional)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const linkGambar = new TextInputBuilder()
        .setCustomId('linkGambar')
        .setLabel('Link Gambar (Opsional)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      modal.addComponents(
        new ActionRowBuilder().addComponents(isiSurat),
        new ActionRowBuilder().addComponents(pengirim),
        new ActionRowBuilder().addComponents(penerima),
        new ActionRowBuilder().addComponents(linkGambar),
      );

      await interaction.showModal(modal);
    }

    if (interaction.customId === 'balasSurat') {
      const modal = new ModalBuilder()
        .setCustomId('formBalasSurat')
        .setTitle('📩 Balas Surat');

      const namaAnda = new TextInputBuilder()
        .setCustomId('namaAnda')
        .setLabel('Nama Anda (Opsional)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const isiBalasan = new TextInputBuilder()
        .setCustomId('isiBalasan')
        .setLabel('Isi Balasan')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(namaAnda),
        new ActionRowBuilder().addComponents(isiBalasan)
      );

      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'formSuratCinta') {
      const isiSurat = interaction.fields.getTextInputValue('isiSurat');
      const pengirim = interaction.fields.getTextInputValue('pengirim') || 'someone';
      const penerima = interaction.fields.getTextInputValue('penerima') || 'someone';
      const linkGambar = interaction.fields.getTextInputValue('linkGambar');

      let penerimaTeks = 'someone';
      if (/^\d{17,19}$/.test(penerima)) {
        penerimaTeks = `<@${penerima}>`;
      } else if (penerima && penerima !== 'someone') {
        penerimaTeks = penerima;
      }

      const tanggal = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

      const embed = new EmbedBuilder()
        .setColor(0x9B59B6)
        .setDescription(`**Isi Surat:**
${isiSurat}`)
        .setFooter({ text: `Surat dari ${pengirim} | ${tanggal} WIB` });

      if (linkGambar) embed.setImage(linkGambar);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('kirimSurat')
          .setLabel('💌 Tulis surat kamu')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('balasSurat')
          .setLabel('📩 Balas surat')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('likeSurat')
          .setEmoji('❤️')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('dislikeSurat')
          .setEmoji('💔')
          .setStyle(ButtonStyle.Secondary)
      );

      const sentMessage = await interaction.reply({
        content: `💌 Nih ada surat untuk ${penerimaTeks}`,
        embeds: [embed],
        components: [row],
        fetchReply: true,
      });

      const surat = {
        pengirim,
        penerima,
        isiSurat,
        linkGambar,
        tanggal,
        messageId: sentMessage.id,
      };

      const filePath = path.join(__dirname, 'data_surat.json');
      let data = [];
      if (fs.existsSync(filePath)) {
        const existing = fs.readFileSync(filePath);
        data = JSON.parse(existing);
      }
      data.push(surat);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    if (interaction.customId === 'formBalasSurat') {
      const isiBalasan = interaction.fields.getTextInputValue('isiBalasan');
      const namaAnda = interaction.fields.getTextInputValue('namaAnda') || 'someone';

      const embedBalasan = new EmbedBuilder()
        .setColor(0x9B59B6)
        .setDescription(`**Balasan Surat:**
${isiBalasan}`)
        .setFooter({ text: `Dari ${namaAnda} | ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB` });

      const originalMessage = await interaction.channel.messages.fetch(interaction.message?.reference?.messageId || interaction.message.id).catch(() => null);
      let thread = originalMessage?.hasThread ? originalMessage.thread : null;
      if (!thread) {
        thread = await originalMessage?.startThread({
          name: `Balasan untuk surat`,
          autoArchiveDuration: 1440,
        });
      }

      if (thread) {
        await thread.send({ embeds: [embedBalasan] });
      } else {
        await interaction.reply({ content: 'Gagal membuat thread.', ephemeral: true });
        return;
      }

      await interaction.reply({ content: 'Balasan kamu sudah dikirim!', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);
