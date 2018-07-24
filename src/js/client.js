/* global TrelloPowerUp */

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
        return [
            {
                icon: 'https://trello-card-quote.surge.sh/img/quote.png?v=1',
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
