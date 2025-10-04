/cmd install prefix.js const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "prefix",
    aliases: [],
    version: "1.1",
    author: "NeoKEX",
    countDown: 5,
    role: 0,
    description: "Show system prefix, group prefix, and current time with owner link.",
    category: "system"
  },

  // 🔥 বট যেন prefix লেখা মাত্র রিপ্লাই দেয় — এজন্য এই অংশ
  onChat: async function ({ event, message, threadsData }) {
    const content = event.body?.toLowerCase().trim();

    // শুধু "prefix" লেখা হলে ট্রিগার হবে
    if (content !== "prefix") return;

    const systemPrefix = global.GoatBot.config.prefix;
    const groupPrefix = await threadsData.get(event.threadID, "data.prefix") || systemPrefix;
    const currentTime = require("moment-timezone")().tz("Asia/Dhaka").format("DD/MM/YYYY • hh:mm:ss A");
    const fbLink = "https://www.facebook.com/nx210.is.back";

    const msg = `💠━━━『 𝐏𝐑𝐄𝐅𝐈𝐗 𝐈𝐍𝐅𝐎 』━━━💠
🧩 𝗦𝘆𝘀𝘁𝗲𝗺 𝗣𝗿𝗲𝗳𝗶𝘅: ${systemPrefix}
💬 𝗚𝗿𝗼𝘂𝗽 𝗣𝗿𝗲𝗳𝗶𝘅: ${groupPrefix}
⏰ 𝗧𝗶𝗺𝗲: ${currentTime}
👤 𝗢𝘄𝗻𝗲𝗿: Maybe Nx
🔗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${fbLink}
💠━━━━━━━━━━━━━━━━━💠`;

    return message.reply(msg);
  }
};
