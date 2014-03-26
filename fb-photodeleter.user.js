// ==UserScript==
// @name                facebook photodeleter

// @description         Automatically deletes photos through an album
// @namespace           https://hugo.barrera.io/userscripts
// @include             https://www.facebook.com/photo.php*
// @require             http://code.jquery.com/jquery-2.1.0.min.js
// @version             1.0.0
// ==/UserScript==

$(function () {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        var ajaxify = links[i].getAttribute('ajaxify');
        if (ajaxify != null && ajaxify.indexOf('photo/delete') > -1) {
            delIndex = i;
            break;
        }
    }
    links[i].click();

    setInterval(function () {
        document.querySelectorAll('button.layerConfirm.uiOverlayButton')[0].click();
    }, 300);
});
