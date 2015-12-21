$(document).ready(function() {
    $(window).on('resize', function() {
        if ($(window).width() < 560) {
            $('link[rel="stylesheet"][href~="Styles/product-finder-ie8.css"]').attr('disabled', true);
        }

        else {
            $('link[rel="stylesheet"][href~="Styles/product-finder-ie8.css"]').attr('disabled', false);
        }
    })
});
