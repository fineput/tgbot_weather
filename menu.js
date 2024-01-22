export const showMenu = (bot, chatId) => {
    bot.telegram.sendMessage(chatId, 'Виберіть дію.', {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Дізнатися погоду",
                        request_location: true,
                    },
                ],
                ["Закрити меню"],
            ],
        },
    });
};

export const closeMenu = (bot, chatId) => {
    bot.telegram.sendMessage(chatId, "Закрито", {
        reply_markup: {
            remove_keyboard: true
        }
    })
}