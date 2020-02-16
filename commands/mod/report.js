const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
  name: "report",
  aliases: ["Report", "REPORT"],
  category: "mod",
  description: "Report a @member",
  run: async (client, msg, args) => {
    if (msg.deletable) msg.delete();

    const mMember =
      msg.mentions.members.first() || msg.guild.members.get(args[0]);

    if (!mMember) return msg.reply("Couldn't find that person. Sowwy.");

    if (mMember.hasPermission("BAN_MEMBERS") || mMember.user.bot) {
      return msg
        .reply("Cant report that person. Given it's not a person.")
        .then(m => m.delete(5000));
    }
    if (!args[1])
      return msg.channel
        .send("Please provide a reason.")
        .then(m => m.delete(5000));

    const channel = msg.guild.channels.find(
      channel => channel.name === "reports"
    );
    if (!channel)
      return msg
        .reply("I couldn't find the `#reports` channel.")
        .then(m => m.delete(5000));
    const embed = new RichEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(msg.guild.name, msg.guild.iconURL)
      .setAuthor("Reported Member", mMember.user.displayAvatarURL)
      .setDescription(stripIndents`**> Member:** ${mMember} (${mMember.id})
    **> Reported by:** ${msg.member} (${msg.member.id})
    **> Reported in:** ${msg.channel}
    **> Reason:** ${args.slice(1).join(" ")}`);

    channel.send(embed);
    return msg.reply("All done, check `#reports`.").then(m => m.delete(5000));
  }
};
