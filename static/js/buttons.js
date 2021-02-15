/* -------------------
title:      buttons.js
author:     Alan Swenson
purpose:    Scroll through a list of divs by using left and right buttons.
            There is no end. The last element continues to the first and vice-versa.
            Uses .active class to determine which content is displayed.
--------------------- */

$(document).ready(function () {
    // get highest section id
    var elArray = $(`[data-id]`).toArray();

    var maxId = Math.max.apply(null, elArray.map(value => {
        return $(value).attr('data-id');
    }));

    // use arrows to cycle through sections
    $('.arrow').click(function () {
        var current_active = $('.active')
        var id = current_active.data("id");
        var new_id;
        if ($(this).hasClass('right')) {
            if (id < maxId) {
                new_id = id + 1;
            }
            else {
                new_id = 1;
            }
        }
        else if ($(this).hasClass('left')) {
            if (id > 1) {
                new_id = id - 1;
            }
            else {
                new_id = maxId;
            }
        }

        var el = $('[data-id=' + new_id + ']');
        current_active.removeClass('active');
        el.addClass('active');
    });
});

