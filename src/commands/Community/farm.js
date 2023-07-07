const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('farm')
    .setDescription('Registre seu farm.')
    .addStringOption(option => option.setName('material').setDescription('Insira qual material você coletou.').setRequired(true))
    .addStringOption(option => option.setName('membro').setDescription('Insira seu nome.').setRequired(true))
    .addStringOption(option => option.setName('quantidade').setDescription('Insira a quantidade que você coletou.').setRequired(true)),
    async execute(interaction, client){

        const material = interaction.options.getString('material')
        const membro = interaction.options.getString('membro')
        const quantidade = interaction.options.getString('quantidade')

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${day}-${month}-${year}`;

        axios.post('https://sheetdb.io/api/v1/qpvhz1obxe2d8', {
            data: {
                material: `${material}`,
                membro: `${membro}`,
                quantidade: `${quantidade}`,
                data: `${currentDate}`
            }
        })

        await interaction.reply({content: 'Farm registrado! '+ membro + ' coletou ' + quantidade + ' de ' + material, ephemeral: false});
    },
}