// ==UserScript==
// @name        Hugo's Facebook Activity Log Purger (comments only)
// @version     1.0
// @include     https://www.facebook.com/*/allactivity?privacy_source=activity_log&log_filter=cluster_116
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @grant       none
// ==/UserScript==


setInterval(function () {
    $('.uiStreamPrivacy + div a span').first().click();
    $('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)').first().find('a')[0].click()
}, 2000);