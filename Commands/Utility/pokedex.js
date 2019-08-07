const discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot,message,args) => {

    if(!args[0]) return message.channel.send('Please specify the name of a Pokémon');

    let {body} = await superagent.get(`https://some-random-api.ml/pokedex?pokemon=${args[0]}`);


    let pokeEmbed = new discord.RichEmbed()
    .setTitle(`Pokédex: ${body.name.toUpperCase()}`)
    .setURL(`https://pokedex.org/#/pokemon/${body.id}`)
    .setColor('#FF0000')
    .setImage(`https://img.pokemondb.net/artwork/${body.name}.jpg`)
    .setFooter('Click the Title for more Information.')
    .addField('Type(s):', `${body.type.join(', ')}`, true)
    .addField('Height:', `${body.height}`, true)
    .addField('Weight:', `${body.weight}`, true)
    .addField('Evolution Line:', `${body.family.evolutionLine.join(' > ')}`, false)
    .addField('Description:', `${body.description}`);

    return message.channel.send(pokeEmbed);

}

module.exports.help = {
    name: 'pokedex'
}