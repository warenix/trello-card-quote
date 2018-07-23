/* global TrelloPowerUp */

$(".searchHasNoResult").css("visibility", "hidden");
$(".searchHasResult").css("visibility", "hidden");

var t = TrelloPowerUp.iframe();
//console.log(t);

var card = null;
// you can access arguments passed to your iframe like so
var arg = t.arg('arg');
//console.log(arg);

var authenticationSuccess = function (data) {
  console.log('Successful authentication');
  console.log(data);
  checkReady();
};

var authenticationFailure = function () {
  console.log('Failed authentication');
};

var checkAuthorize = function() {
  window.Trello.authorize({
    type: 'popup',
    name: 'Card Quote',
    scope: {
      read: 'true',
      write: 'true'
    },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
  });
}
checkAuthorize();

t.card('id', 'name', 'desc', 'url', 'shortLink', 'idList')
  .then(function (data) {
    console.log(data);
    card = data;


    checkReady();

  }, function (error) {
    console.log(error);
  });

t.render(function () {
  console.log('render()');
});



function checkReady() {
  if (card == null) {
    return;
  }
  else {
    console.log("ready, search card: " + card.shortLink);
  }

  window.Trello.get('/search/', {
    query: card.shortLink
  }, function (data) {
    console.log("search result:")
    console.log(data);

    renderSearchResult(data);
  }, function(error){
    if (error.responseText && error.responseText === 'invalid token') {
      window.Trello.setToken(null);
      checkAuthorize();
    }
  });

}

function renderSearchResult(data) {

  if (!data) {
    // show empty result.
    return;
  }
  var count = data.cards.length;
  if (count > 0) {
    var resultCount = 0;
    var resultCard = null;
    for (var i = 0; i < count; ++i) {
      resultCard = data.cards[i];
      if (resultCard.shortLink != card.shortLink) {
        ++resultCount;
        $(".resultList").append("<li>"
          + "<a"
          + " href=\"" + resultCard.url + "\""
          + " target=\"" + "_blank" + "\""
          + ">"
          + "<span class=\"searchResultCardName\">" + data.cards[i].name + "</span>"
          + "<br\>"
          + "<blockquote class=\"searchResultCardDesc\">" + convertCardDescToHtml(resultCard.desc) + "</blockquote>"
          + "</a></li>");
      }
    }

    $(".searchInProgress").hide();
    if (resultCount == 0) {
      $(".searchHasNoResult").css("visibility", "visible");
    } else {
      $(".searchResultCount").append(resultCount + " results found");
      $(".searchHasResult").css("visibility", "visible");
    }
  }
}

function convertCardDescToHtml(desc) {
  if (!desc) {
    return null;
  }

  return desc.replace(/\n/g, "<br\>");
}
