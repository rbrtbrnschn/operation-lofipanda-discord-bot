const { getMember, formatDate } = require("../../functions");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "info",
  aliases: ["information", "links"],
  category: "info",
  description: "List socials and other important info.",
  run: async (client, msg, args) => {
    const member = getMember(msg, args.join(" "));
    const mention = `<@${msg.author.id}>`;
    let embed = new RichEmbed()
      .setColor(member.displayHexColor)
      .setFooter(member.displayName, member.user.displayAvatarURL)
      .addField(
        "Links",
        stripIndents`**> About The Operation:** Go to our [Website](https://doesisaacbeat.me/about) to find out more about the operation.
      **> Github:** If you want to collab, or help out : [Github](https://github.com/rbrtbrnschn/operation-lofipanda).
      **> Trello Board:** Take [Action](https://trello.com/b/PLIlzSJR/operation-lofi-panda) and decide on how this community project is going to end up. .
      **> Youtube:** Check out The Startup Guy on [Youtube](https://trello.com/b/PLIlzSJR/operation-lofi-panda).
      **> Twitch:** Can I interest you in [Coding Challanges](https://twitch.com/thestartupguystwitch)?
      `,
        true
      )
      .setTimestamp();
    msg.channel.send(embed);
  }
};
