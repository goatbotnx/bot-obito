const axios = require("axios");

module.exports = {
  config: {
    name: "imgur",
    aliases: ["img", "uploadimg"],
    version: "1.2",
    author: "xnil6x + NX",
    shortDescription: {
      en: "🖼️ Upload media to Imgur"
    },
    longDescription: {
      en: "✨ Upload any replied image/video/GIF to Imgur and get a public link"
    },
    category: "utility",
    guide: {
      en: "{p}imgur (reply to a media message)"
    }
  },

  onStart: async function ({ api, event, message }) {
    try {
      const reply = event.messageReply;
      if (!reply || !reply.attachments || reply.attachments.length === 0) {
        return message.reply("📸 অনুগ্রহ করে কোনো ছবি, ভিডিও বা GIF-এ রিপ্লাই দাও যাতে আমি সেটা Imgur-এ আপলোড করতে পারি।");
      }

      const attachment = reply.attachments[0];
      const fileUrl = attachment.url;

      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      // Upload to Imgur using Client-ID (more stable than Bearer token)
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        { image: fileUrl, type: "url" },
        {
          headers: {
            Authorization: "Client-ID 4409585c7a31b4e", // Public test client ID (you can replace with your own)
            "Content-Type": "application/json"
          }
        }
      );

      const imgur = response.data?.data;
      if (!imgur || !imgur.link) throw new Error("No link returned from Imgur");

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      const msg = `
🖼️ 𝗜𝗠𝗚𝗨𝗥 𝗨𝗣𝗟𝗢𝗔𝗗 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟!
━━━━━━━━━━━━━━
🔗 𝗟𝗶𝗻𝗸: ${imgur.link}
💽 𝗧𝘆𝗽𝗲: ${imgur.type}
📦 𝗦𝗶𝘇𝗲: ${(imgur.size / 1024).toFixed(1)} KB
━━━━━━━━━━━━━━
✨ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 ${this.config.author}
      `;

      message.reply(msg);
    } catch (err) {
      console.error("🔴 Imgur Upload Error:", err?.response?.data || err.message);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      message.reply("⚠️ আপলোডে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করো।");
    }
  }
};
