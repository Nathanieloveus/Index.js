const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'onlineUsers.json');
let onlineUsers = new Set();
let embedMessages = []; // { channelId, messageId }

// Load online user dari file saat bot start
function loadOnlineUsers() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      onlineUsers = new Set(data.onlineUsers || []);
      embedMessages = data.embedMessages || [];
    }
  } catch (e) {
    onlineUsers = new Set();
    embedMessages = [];
  }
}

// Save online user ke file setiap ada perubahan
function saveOnlineUsers() {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({
      onlineUsers: Array.from(onlineUsers),
      embedMessages: embedMessages
    }, null, 2)
  );
}

function addOnlineUser(username) {
  onlineUsers.add(username);
  saveOnlineUsers();
}

function getOnlineUsernames() {
  return Array.from(onlineUsers);
}

function onlineCount() {
  return onlineUsers.size;
}

function addEmbedMessage(channelId, messageId) {
  // Cegah duplikat
  if (!embedMessages.some(e => e.channelId === channelId && e.messageId === messageId)) {
    embedMessages.push({ channelId, messageId });
    saveOnlineUsers();
  }
}

function getEmbedMessages() {
  return embedMessages;
}

// Load data saat pertama kali
loadOnlineUsers();

module.exports = {
  addOnlineUser,
  getOnlineUsernames,
  onlineCount,
  addEmbedMessage,
  getEmbedMessages,
  // Untuk testing/reset
  // clearOnlineUsers: () => { onlineUsers = new Set(); saveOnlineUsers(); }
};
