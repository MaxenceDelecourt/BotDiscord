const { GatewayIntentBits } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const Discord = require('discord.js');

const client = new Discord.Client({
  intents : [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
  ]
});

//paramétrage du prefix 
const prefix = '/';
const goulaga = prefix + 'goulaga';
const come = prefix + 'come';

//timer de 2000 millisecondes = 2 secondes
const delayBeforeMovingBack = 2000; 

client.on('messageCreate', message => {

  const member = message.mentions.members.first();// membre mentioné dans le message
  const GoulagChannel = message.guild.channels.cache.find(channel => channel.name === 'Goulag');
  const GeneralChannel = message.guild.channels.cache.find(channel => channel.name === 'Général');
  const voiceChannel = message.member.voice.channel; // user qui a écrit le message 
  const username = message.author; // nom de l'auteur du message

  let haspermission = false; // set les droits users.

  //verifie si le membre qui fait la demande est admin
  try {
    haspermission = message.member.permissions.has(PermissionFlagsBits.Administrator);
  } catch (error) {
    throw error;
  } 

  if(haspermission){

    // Vérifie si la commande commence par le préfixe + "augoulaga"//
    if (message.content.startsWith(goulaga)) {

      // Vérifie si le membre et le canal existent
      if (member && GoulagChannel) {
        //on repond au user
        message.reply(`AU GOULAG ${member} PETIT SHLOMO !!!!`);

        // Déplace le membre dans le canal "goulag"
        member.voice.setChannel(GoulagChannel);
        member.voice.setMute(true);
      } else {
        message.reply("AUCUN SHLOMO POUR CREUSER !!!! ")
      }
    }

    if (message.content.startsWith(come)) {

      // Vérifie si le membre et le canal existent
      if (member && GeneralChannel) {
        //on repond au user
        message.reply("RESTE CALME LA PROCHAINE FOIS PETIT SHLOMO, COMPRIS ?!");

        // Déplace le membre dans le canal "goulag"
        member.voice.setChannel(GeneralChannel);
        member.voice.setMute(false);
      } else {
        message.reply("JE NE VOIS AUCUN SHLOMO QUI PEUT RENTRER !!!! ")
      }

    }
  } else {
     
     if (username.bot) return; // Ignore les messages des autres bots

     if (voiceChannel) { // Vérifie si l'utilisateur est connecté à un canal vocal

      if (message.content.startsWith(goulaga)) {

       message.reply(`TU T'ES PRIS POUR QUI ${username}, HOP AU GOULAG SHLOMO VA !!!!`);

       if (voiceChannel.id !== GoulagChannel) {

        // Vérifie si l'utilisateur est déjà dans le canal de destination
         message.member.voice.setChannel(GoulagChannel);
         message.member.voice.setMute(true);

         // Déplace l'utilisateur dans le canal de destination
        setTimeout( () => { // Utilise setTimeout pour déplacer l'utilisateur dans le canal initial après un délai
            if (voiceChannel.id === GoulagChannel) { // Vérifie si l'utilisateur est toujours dans le canal de destination
              message.member.voice.setChannel(GeneralChannel);// Déplace l'utilisateur dans le canal initial
              message.member.voice.setMute(false);  
            }
          }, delayBeforeMovingBack);
        }
       }
     }
  }
});

 // Remplacez TOKEN_DISCORD par le token de votre bot Discord
client.login('MTAyMDI5MjQwMDYyMDUxMTM1Mw.GhG0mI.iQsYO9X0NyQ_KFrrmhjoBE3aY6IoMiIOlAwkhI');