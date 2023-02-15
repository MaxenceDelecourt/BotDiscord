const Discord = require('discord.js');
const client = new Discord.Client({intents : []});
const prefix = '!';

client.on('message', message => {

  // Vérifie si la commande commence par le préfixe + "augoulaga"
  if (message.content.startsWith(prefix + 'augoulaga')) {
    
    console.log ('hello jai bien reçu la commande');

    // Obtient le premier membre mentionné dans la commande
    const member = message.mentions.members.first();

    // Trouve le canal appelé "goulag"
    const goulagChannel = message.guild.channels.cache.find(channel => channel.name === 'goulag');
    
    // Vérifie si le membre et le canal existent
    if (member && goulagChannel) {
      // Déplace le membre dans le canal "goulag"
      member.voice.setChannel(goulagChannel);
    }
  }
});

 // Remplacez TOKEN_DISCORD par le token de votre bot Discord
client.login('MTAyMDI5MjQwMDYyMDUxMTM1Mw.GNKA0L.2zMPconNadRe7P2ViGnwF09vl8lt1rOuupwoz4');