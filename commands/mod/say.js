const { RichEmbed } = require("discord.js");
module.exports = {
  name: "say",
  category: "mod",
  description: "wip",
  run: async (client, msg, args) => {
    if (msg.deletable) msg.delete();
    if (args < 1)
      return msg.reply("Nothing To Say?").then(m => {
        m.delete(500);
      });
    if (args[0] === "bruv") {
      return msg.reply("Aye, would've said the same.");
    }
    const roleColor = msg.guild.me.displayHexColor;

    if (args[0] === "embed") {
      const embed = new RichEmbed()
        .setColor(roleColor)
        .setDescription(args.slice(1).join(" "));
      msg.channel.send(embed);
    } else {
      msg.channel.send(args.join(" "));
    }
  }
};
