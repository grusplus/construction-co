var Game = Game || {}; Game.Builder = Game.Builder || {}; (function (window, $, undefined) {

    var p = {}, main = {}, templates = {};

    /**
     * This function will be accessible everywhere using Game.Builder.functionName
     * @return {[type]} [description]
     */
    main.functionName = function() {

    }

    /**
     * This function will only be accessible in this file using p.functionName
     * @return {[type]} [description]
     */
    p.functionName = function() {

    }

    $.extend(window.Game.Builder, main);

    /**
     * Templates used with Moustache to render html
     *
     * @type
     */
    templates = {

        one:
            `<ul>{{ content }}</ul>`,

        two:
            `<li class="nav-item nav-day">
                <a href="#{{ urlDate }}" onclick="Game.Pages.turnTo('{{ urlDate }}')" class="nav-link js-menuitem">
                    {{ displayDateOne }}
                    <br>
                    <small>
                        {{ displayDateTwo }}
                    </small>
                    <span class="badge badge-rating badge-rating-{{ rating }}">{{ rating }}</span>
                </a>
            </li>`,
    };

})(window, jQuery);
