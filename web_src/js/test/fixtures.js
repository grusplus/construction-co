var Game = Game || {}; Game.Fixtures = Game.Fixtures || {}; (function (window, $, undefined) {

    var p = {data:null}, fixtures = {};

    fixtures.get = function(key){
        return p.data[key];
    };

    p.data = {}

    $.extend(window.Game.Fixtures, fixtures);

})(window, jQuery);

