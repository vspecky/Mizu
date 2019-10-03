const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (Mizu,message,args) => {

    const settings = Mizu.sets;
    
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args.length || !isNaN(args[0])) return message.channel.send(usageEmbed);

    let {body} = await fetch(`https://some-random-api.ml/pokedex?pokemon=${args[0]}`).then(res => res.json());


    let pokeEmbed = new RichEmbed()
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

module.exports.config = {
    name: 'pokedex',
    usage: "```.pokedex <NameOfPokemon>```",
    desc: 'Gets information about the specified pokemon.'
}