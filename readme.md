## Grapefruit Apps

The root of the /apps folder is for the web source and the grunt compiler. The grunt scripts will take the web stuff, compile it, and put it into the various folders for the different frameworks that use it (cordova, electron).

### Commands

Use the app flag (m/c = mobile, d/e = desktop) to specify the destination.

Development: `grunt compile --app=m`
Production:  `grunt prepare --app=m`