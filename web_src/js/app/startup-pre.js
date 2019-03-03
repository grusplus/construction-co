// Not related to this file, but to set up for pages files that can come and go
Game = {};

const readline = require('readline-sync');

function isElectron(){
    return typeof process !== 'undefined';
}

function isCordova(){
    return window.hasOwnProperty("cordova");
}

// Only Electron stuff
if(false && isElectron()){

    const remote = require('electron').remote;

    (function handleWindowControls() {
        // When document has loaded, initialise
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                initWindowsButtons();
            }
        };

        function initWindowsButtons() {
            let window = remote.getCurrentWindow();
            const minButton = document.getElementById('min-button'),
                maxButton = document.getElementById('max-button'),
                restoreButton = document.getElementById('restore-button'),
                closeButton = document.getElementById('close-button');

            if(!minButton){
                return;
            }

            minButton.addEventListener("click", event => {
                window = remote.getCurrentWindow();
                window.minimize();
            });

            maxButton.addEventListener("click", event => {
                window = remote.getCurrentWindow();
                window.maximize();
                toggleMaxRestoreButtons();
            });

            restoreButton.addEventListener("click", event => {
                window = remote.getCurrentWindow();
                window.unmaximize();
                toggleMaxRestoreButtons();
            });

            // Toggle maximise/restore buttons when maximisation/unmaximisation
            // occurs by means other than button clicks e.g. double-clicking
            // the title bar:
            toggleMaxRestoreButtons();
            window.on('maximize', toggleMaxRestoreButtons);
            window.on('unmaximize', toggleMaxRestoreButtons);

            closeButton.addEventListener("click", event => {
                window = remote.getCurrentWindow();
                window.close();
            });

            function toggleMaxRestoreButtons() {
                window = remote.getCurrentWindow();
                if (window.isMaximized()) {
                    maxButton.style.display = "none";
                    restoreButton.style.display = "flex";
                } else {
                    restoreButton.style.display = "none";
                    maxButton.style.display = "flex";
                }
            }
        }
    })();

    var shell = require('electron').shell;
    //open links externally by default
    $(document).on('click', 'a[href^="http"]', function (event) {
        event.preventDefault();
        shell.openExternal(this.href);
    });

}