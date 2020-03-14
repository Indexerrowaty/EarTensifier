const premium = require('../../utils/premium/premium.js');

const Discord = require('discord.js');

module.exports = {
    name: "bass",
    description: "Turns on bass filter",
    cooldown: '10',
    async execute(client, message, args) {
        if(!premium(message.author.id, "Supporter")) return client.responses('noPremium', message);

        const voiceChannel = message.member.voice.channel;
        const player = client.music.players.get(message.guild.id);

        if (!voiceChannel) return client.responses('noVoiceChannel', message);
        if (voiceChannel.id != message.guild.members.cache.get(client.user.id).voice.channel.id) return client.responses('sameVoiceChannel', message);

        if (!player) return client.responses('noSongsPlaying', message);

        const delay = ms => new Promise(res => setTimeout(res, ms));

        if (args[0] && (args[0].toLowerCase() == "reset" || args[0].toLowerCase() == "off")) {
            player.setEQ(Array(13).fill(0).map((n, i) => ({ band: i, gain: 0.15 })))
            let msg = await message.channel.send(`${client.emojiList.loading} Turning off **bass**. This may take a few seconds...`)
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`Bass off`)
                .setColor(client.colors.main);
            await delay(5000);
            return msg.edit("", embed);
        }

        player.setEQ([
            { band: 0, gain: 0.6 },
            { band: 1, gain: 0.7 },
            { band: 2, gain: 0.8 },
            { band: 3, gain: 0.55 },
            { band: 4, gain: 0.25 },
            { band: 5, gain: 0 },
            { band: 6, gain: -0.25 },
            { band: 7, gain: -0.45 },
            { band: 8, gain: -0.55 },
            { band: 9, gain: -0.7 },    
            { band: 10, gain: -0.3 },    
            { band: 11, gain: -0.25 },
            { band: 12, gain: 0 },   
            { band: 13, gain: 0 }    
       ]);

        let msg = await message.channel.send(`${client.emojiList.loading} Turning on **bass**. This may take a few seconds...`)
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`Bass filter on`)
            .setFooter(`Reset filter: ear reset`)
            .setColor(client.colors.main);
        await delay(5000);
        return msg.edit("", embed);
    }
}