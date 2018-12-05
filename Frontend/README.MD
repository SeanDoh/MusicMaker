# MusicMaker Frontend
Frontend of the MusicMaker extension.  This is what is loaded onto Twitch.


## Language Background
This app is currently built with HTML, CSS, vanilla javascript, and Node.js
Some html is stored in .html files, some is generated via javascript.
CSS is compiled from Sass(SCSS).
Javascript is bundled via Webpack.


## Requirements for development:
1. Node.js
2. npm


## Set up your dev environment to contribute:
*Note:* I am currently developing on Windows 7 with Visual Studio Code
1. Download this repo
2. Navigate to MusicMaker/Frontend in your command line
3. run ```npm install```
4. There are some npm scripts ready
    * build (bundles js): ```webpack --progress --mode=production```
    * watch (bundles js on change): ```webpack --progress --watch```
    * server (opens index.html and live reloads): ```webpack-dev-server --open```
    * sass (compile sass on change): ```node-sass sass -rw -o css```
    * **Run these scripts in the command line via** ```npm run scriptName```