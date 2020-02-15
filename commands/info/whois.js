const { getMember, formatDate } = require("../../functions");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
  name: "whois",
  aliases: ["userinfo", "user", "who"],
  category: "info",
  description: "Returns User Info",
  usage: "[username | id | mention ]",
  run: async (client, message, args) => {
    const member = getMember(message, args.join(" "));

    //Member var
    const joined = formatDate(member.joinedAt);
    const roles =
      member.roles
        .filter(r => r.id !== message.guild.id)
        .map(r => r)
        .join(", ") || "none";

    // User var
    const created = formatDate(member.user.createdAt);
    const embed = new RichEmbed()
      .setFooter(member.displayName, member.user.displayAvatarURL)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )

      .addField(
        "Member information",
        stripIndents`**> Display name:** ${member.displayName}
      **> Joined at:** ${joined}
      **> Roles:** ${roles}`,
        true
      )

      .addField(
        `User information`,
        stripIndents`**> ID:** ${member.user.id}
      **> Username:** ${member.user.username}
      **> Discord Tag:** ${member.user.tag}
      **> Created At:** ${created}`,
        true
      )

      .setTimestamp();

    if (member.user.presence.game) {
      embed.addField(
        `Currently playing:`,
        stripIndents`**> Name:** ${member.user.presence.game}`
      );
    }
    message.channel.send(embed);
  }
};
