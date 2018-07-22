/* global TrelloPowerUp */

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return [
            {
                icon: 'https://github.com/warenix/trello-card-quote/raw/master/src/img/quote.svg',
                text: 'Card Quote',
                callback: function (t) {
                    return t.popup({
                        title: "Card Quote",
                        url: 'result.html'
                    });
                }
            },
        ];
    },
});