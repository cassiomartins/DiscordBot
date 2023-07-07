const { SlashCommandBuilder, InteractionResponse } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('venda')
    .setDescription('Registre sua venda.')
    .addStringOption(option => option.setName('produto').setDescription('Insira qual produto você vendeu.').setRequired(true))
    .addStringOption(option => option.setName('membro').setDescription('Insira seu nome.').setRequired(true))
    .addStringOption(option => option.setName('quantidade').setDescription('Insira a quantidade que você vendeu.').setRequired(true))
    .addStringOption(option => option.setName('taxa').setDescription('Insira a taxa da FAC.').setRequired(true)),
    async execute(interaction, client){

        const produto = interaction.options.getString('produto')
        const membro = interaction.options.getString('membro')
        const quantidade = interaction.options.getString('quantidade')
        const taxa = interaction.options.getString('taxa')

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${day}-${month}-${year}`;

        axios.post('https://sheetdb.io/api/v1/qpvhz1obxe2d8/sheet', {
            data: {
                produto: `${produto}`,
                membro: `${membro}`,
                quantidade: `${quantidade}`,
                taxa: `${taxa}`,
                data: `${currentDate}`
            },
            sheet: 'Vendas'
        })
        
        await interaction.reply({content: 'Venda registrada! '+ membro + ' vendeu ' + quantidade + ' de ' + produto, ephemeral: false});
    },
}