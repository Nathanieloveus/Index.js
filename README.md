# Growtopia Discord Bot Skeleton

## Struktur Folder

```
src/
  bot.js
  config.js
  utils/
    logger.js
    passwordUtil.js
    embedUtil.js
  data/
    users.json
    session.json
  features/
    auth/
      register.js
      login.js
      session.js
    welcome/
      welcomeEmbed.js
      infoEmbed.js
    navigation/
      handleButtons.js
      updateEmbed.js
  interactions/
    modals/
      registerModal.js
      loginModal.js
    collectors/
      modalCollector.js
.env
```

## Cara Jalanin

1. `npm install`
2. Atur `.env` (`BOT_TOKEN=...`)
3. Jalankan dengan: `node src/bot.js`
4. Ketik `/start` di Discord untuk memunculkan embed utama

## Catatan

- Semua interaksi menggunakan tombol dan modal (bukan slash command).
- Data user dan session disimpan di folder `data/`.
- Siap dikembangkan untuk fitur game dan navigasi lanjutan.
