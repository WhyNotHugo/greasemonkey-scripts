// ==UserScript==
// @name        Hugo's Facebook Timeline Wipe Automator
// @version     1.1
// @include     https://www.facebook.com/*/allactivity*
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @grant       none
// ==/UserScript==
//Original script: Facebook - Delete My Timeline Copyright (C) 2013  George Piskas (geopiskas@gmail.com)
//Modified by the Anus Panda, same year (anus.panda@gmail.com)
function KeyCheck(e) {
    var postList = document.getElementsByClassName('mrs _2fmu customimg img');
    var ignoreCount = 0;
    var free = true;
    if (postList.length == 0) {
        console.error('No posts to work with');
    } 
    else {
        // Wait for mutex
        var waitMutex = setInterval(function () {
            if (postList.length == ignoreCount) {
                clearInterval(waitMutex);
                if (ignoreCount == 0) {
                    console.log('All visible posts have been deleted or hidden');
                    window.location = window.location;
                } 
                else {
                    console.log('All visible posts have been deleted or hidden but ' + ignoreCount + ' post(s) did not respond');
                }
            } 
            else if (free == true) {
                free = false;
                deletePost();
            }
        }, 100);
    }
    function deletePost() {
        // Open menu and find delete or hide buttons
        postList[ignoreCount].click();
        var waitMenu = setInterval(function () {
            if (document.querySelectorAll('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)') .length > 0 && document.querySelectorAll('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)') [0].getElementsByTagName('a') .length > 0) {
                clearInterval(waitMenu);
                var delIndex = - 1;
                var hideIndex = - 1;
                var buttons = document.querySelectorAll('.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)') [0].getElementsByTagName('a');
                for (var i = 0; i < buttons.length; i++) {
                    var ajaxify = buttons[i].getAttribute('ajaxify');
                    //comment out or delete below to remove specific functionality
                    if (ajaxify.indexOf('remove_content') > - 1) {
                        delIndex = i;
                        break;
                    }
                    //added by esnahn. removes likes

                    if (ajaxify.indexOf('unlike') > - 1) {
                        delIndex = i;
                        break;
                    }
                    if (ajaxify.indexOf('remove_comment') > - 1) {
                        delIndex = i;
                        break;
                    }
                    //if (ajaxify.indexOf('report') > - 1)
                    //{
                    //    delIndex = i;
                    //    break;
                    //}

                    if (ajaxify.indexOf('hide') > - 1) {
                        hideIndex = i;
                    }
                }
                // got the index, work with it

                if (delIndex > - 1) {
                    var postCount = postList.length - ignoreCount;
                    // Wait for del dialogue and click
                    buttons[delIndex].click();
                    var waitDel = setInterval(function () {
                        if (document.getElementsByClassName('uiButtonConfirm') .length > 0) {
                            clearInterval(waitDel);
                            // Wait for post gone and free mutex
                            document.getElementsByClassName('uiButtonConfirm') [0].click();
                            var waitGone = setInterval(function () {
                                if (postCount > postList.length - ignoreCount) {
                                    clearInterval(waitGone);
                                    free = true;
                                }
                            }, 100);
                        }
                    }, 100);
                } 
                else if (hideIndex > - 1) {
                    buttons[hideIndex].click();
                    var waitHide = setInterval(function () {
                        clearInterval(waitHide);
                        free = true;
                    }, 100);
                } 
                else {
                    ignoreCount += 1;
                    free = true;
                }
            }
        }, 100);
    }
}
function start(e) {
    if (e.keyCode == 69) {
        console.log('e pressed. Starting now');
        alert('starting');
        KeyCheck();
        setInterval(KeyCheck, 120000);
    }
}
window.addEventListener('keydown', start, true);
$(function () {
    // start after 20 seconds
    setTimeout(function () {
        console.log('Starting deletions...');
        KeyCheck();
    }, 20000);
    // reload every 5 minutes
    setTimeout(function () {
        window.location = window.location;
    }, 180000);
    setTimeout(function () {
        var press = jQuery.Event('keypress');
        press.ctrlKey = false;
        press.which = 115;
        $('#fbTimelineLogBody') .trigger(press);
    }, 30000);
});

