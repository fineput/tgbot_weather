import { Telegraf } from 'telegraf';
import axios from 'axios';
import { showMenu, closeMenu } from './menu.js';
import { commands } from './const.js';

import dotenv from 'dotenv';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`${ctx.message.from.first_name ? ctx.message.from.first_name : 'Користувач'}, ласкаво просимо до боту з прогнозу погоди. Для старту роботи напишіть місто, яке вас цікавить чи напишіть "Меню", щоб дізнатися погоду по вашій геолокації.`));

bot.on('message', async (ctx) => {
    try {
        const chatId = ctx.chat.id;

        if (ctx.message.text == "Меню"){
            showMenu(bot, chatId);
        } else if (ctx.message.location) {

            console.log(ctx.message.location);

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=cfd07ad62bff5afd2c4c0ab025130d57`;
            const response = await axios.get(url);
            console.log(response);

            const Celsium = response.data.main.temp - 273.15;
            ctx.reply(`${response.data.name}: Температура: ${Celsium.toFixed(2)} °C, Вологість: ${response.data.main.humidity}%, Швидкість вітру: ${response.data.wind.speed} м/с`);
        } else if (ctx.message.text){

            const cityName = ctx.message.text;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=cfd07ad62bff5afd2c4c0ab025130d57`;
            const response = await axios.get(url);

            const Celsium = response.data.main.temp - 273.15;
            ctx.reply(`${response.data.name}: Температура: ${Celsium.toFixed(2)} °C, Вологість: ${response.data.main.humidity}%, Швидкість вітру: ${response.data.wind.speed} м/с`);

        } else {
            closeMenu(bot, chatId);
        }

    } catch (error) {
        console.error(error);
    }
    
    
    });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));