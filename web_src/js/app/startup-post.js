/**
 * Start it up!
 *
 * First we need to fetch the data, or set it up if it doesn't exist.
 *
 * Then we build all the UI Elements.
 *
 *  - Data uses the IO class to load/save and hold the data.
 *  - We use other classes such as this one to snatch data from IO and inject it into the
 *      UI builders.
 *
 * @param  {void}
 * @return {void}
 */
// $(function() {
    // For Cordova we wait to build until the device is ready so we can get the data first
    // SQLite requires deviceready state
    // if(isCordova()){
    //     document.addEventListener("deviceready", Game.Builder.cordovaInit, false);
    //     document.body.classList.add(window.cordova.platformId, "mobile");
    // } else {
        Game.Builder.init();
    //     document.body.classList.add("desktop");
    // }
// });