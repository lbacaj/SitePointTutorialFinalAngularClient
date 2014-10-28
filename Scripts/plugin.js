var revealingMenuModule = (function ($) {

    // Create the module
    var menuModule = function (userOptions) {

        // Define default options
        var options = {
            innerWrapper: ".inner-wrapper",
            menuButton: '.open-menu',
            position: 'left',
            speed: 250
        };

        // Set the user options
        if (userOptions != null && userOptions != undefined
            && userOptions != 'undefined') {
            for (var opt in options) {
                if (userOptions[ opt ] != null
                    && userOptions[ opt ] != undefined
                    && userOptions[ opt ] != 'undefined') {
                    options[ opt ] = userOptions[ opt ];
                }
            }
        }

        var $position = options.position,
            animationComplete = false,
            $innerWrapper = $(options.innerWrapper),
            $body = $("body"),
            $html = $("html"),
            $menu = $(".menu"),
            $menuButton = $(options.menuButton),
            openMenu = function () {
                    if(animationComplete) {
                        $innerWrapper.velocity({
                            translateX: 0
                        }, {
                            duration: options.speed,
                            delay: options.speed * 0.05,
                            complete: function () {
                                animationComplete = false;
                                $body.removeAttr('style');
                                $.removeAttr('style');
                            }
                        });
                    } else {
                        $innerWrapper.velocity({
                            translateX: 250
                        }, {
                            easing: "linear",
                            duration: options.speed,
                            delay: options.speed * 0.05,
                            complete: function () {
                                animationComplete = true;
                                $body.css({
                                    'overflow' : 'hidden',
                                    'position' : 'absolute',
                                    width : '100%',
                                    height : '100%'
                                });
                                $html.css({
                                    'overflow' : 'hidden'
                                });
                            }
                        });
                    }
            };

        $menuButton.click(function(event) {
            event.stopPropagation();
            openMenu();
        });
        $innerWrapper.click(function () {
            if(animationComplete){
                openMenu();
            }
        });

        return options;
    };

    return menuModule;

})(jQuery);

var menuLeft = new revealingMenuModule({
    innerWrapper: ".inner-wrapper",
    menuButton: '.open-menu',
    position: 'left',
    speed: 170
});

var $panel = $('.panel-dashboard');



var $close = $('.remove');
$close.on('click', function() {
    $(this).parent().slideUp();
});
