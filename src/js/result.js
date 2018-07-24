/* global TrelloPowerUp */

// $(".searchHasNoResult").css("visibility", "hidden");
// $(".searchHasResult").css("visibility", "hidden");
// $(".authenticationFailed").css("visibility", "hidden");
$(".authenticationFailed").hide();
$(".searchHasNoResult").hide();
$(".searchHasResult").hide();
$(".searchInProgress").show();


var t = TrelloPowerUp.iframe();

var authenticationSuccess = function (data) {
  checkReady();
};

var authenticationFailure = function () {
  console.log('Failed authentication');
  $(".authenticationFailed").show();
  $(".searchHasNoResult").hide();
  $(".searchHasResult").hide();
  $(".searchInProgress").hide();
};

var checkAuthorize = function () {
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

function checkReady() {
  t.card('id', 'name', 'desc', 'url', 'shortLink', 'idList')
    .then(function (data) {
      card = data;

      searchCardQuote(card);

    }, function (error) {
      console.log("get current card error");
      console.log(error);
    });
}

function searchCardQuote(card) {
  console.log("ready, search card: " + card.shortLink);
  window.Trello.get('/search/', {
    query: card.shortLink
  }, function (data) {
    renderSearchResult(data);
  }, function (error) {
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
      // $(".searchHasNoResult").css("visibility", "visible");
      $(".searchHasNoResult").show();
    } else {
      $(".searchResultCount").append(resultCount + " results found");
      // $(".searchHasResult").css("visibility", "visible");
      $(".searchHasResult").show();
    }
  }
}

function convertCardDescToHtml(desc) {
  if (!desc) {
    return null;
  }

  return desc.replace(/\n/g, "<br\>");
}


checkAuthorize();