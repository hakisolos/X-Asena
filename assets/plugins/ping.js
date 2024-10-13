const { fromBuffer, mimeTypes } = require("file-type");
const { command, isPrivate } = require("../../lib/");
command(
  {
    pattern: "ping",
    fromMe: isPrivate,
    desc: "To check ping",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();

    // Send the image first
    const imageUrl = "https://f.uguu.se/wJBmDhzp.jpg"; // Example image URL
    await message.sendMessage(message.jid, imageUrl, { caption: "Testing Ping..." }, "image");

    // After image is sent, calculate the ping
    const end = new Date().getTime();
    const pingTime = (end - start).toFixed(2); // Format to two decimal places

    // Calculate uptime in HH:MM:SS format
    const uptime = process.uptime();
    const uptimeStr = new Date(uptime * 1000).toISOString().substr(11, 8);

    // Send ping result under the image
    const caption = `*Pong!*\n📡 Ping: \`\`\`${pingTime} ms\`\`\`\n⏳ Uptime: \`\`\`${uptimeStr}\`\`\``;
    await message.sendMessage(message.jid, caption);
  }
);


command(
  {
    pattern: "alive",
    fromMe: isPrivate,
    desc: "Alive message with bot info",
    type: "user",
  },
  async (message, match) => {
    const uptime = process.uptime();
    const uptimeStr = new Date(uptime * 1000).toISOString().substr(11, 8); // Convert uptime to HH:MM:SS

    const imageUrl = "https://f.uguu.se/wJBmDhzp.jpg"; // Example image URL
    const ownerName = "KING HAKI"; // Change to the actual owner name
    const repoUrl = "https://github.com/hakisolos/haki-md"; // Replace with your repo URL

    const caption = `
🌟 *Haki-MD* is Alive! 🌟

👑 *Owner*: ${ownerName}
🕒 *Uptime*: \`\`\`${uptimeStr}\`\`\`
💻 *Repo*: [Click Here](${repoUrl})

🚀 *Powered by Haki-MD*

╔═════════════════╗
       ⚡ *ALIVE* ⚡ 
╚═════════════════╝
    `;

    // Send the image with the flashy alive message as caption
    await message.sendMessage(message.jid, imageUrl, { caption: caption }, "image");
  }
);
