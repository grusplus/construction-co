var Game = Game || {}; Game.Config = Game.Config || {}; (function (window, undefined) {

    var p = {data:null}, config = {};

    config.get = function(key){
        return data[key];
    };

    var data = {
        ratings: [
            "good",
            "medium",
            "bad"
        ],
        ratingNumbers: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
        ],
        emotions: [
            "Game",
            "Hopeful",
            "Ecstatic",
            "Loved",
            "Loving",
            "Confident",
            "Energetic",
            "Content",
            "Calm",
            "Pensive",
            "Bored",
            "Numb",
            "Tired",
            "Annoyed",
            "Sad",
            "Self-conscious",
            "Angry",
            "Afraid",
            "Exhausted",
            "Anxious",
            "Depressed"
        ]
    };

    window.Game.Config =  config;

})(window);
