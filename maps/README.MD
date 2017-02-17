# Project based on Angular 2, Bootstrap 4 and Webpack

### Demo

<a target="_blank" href="http://localhost:3000/"><img src=""></a>

## Documentation
### Installation, customization and other useful info:
#### Prerequisites to run *application*:
- Node JS >= 6.2
- npm >= 4.0
- run *npm install* ( like administrator) to get all node modules installed

## Run application:
- npm start

# Doing *e2e* testing using Protractor :

#### How to install protractor:
- verify your npm settings(use command : *npm config list*). If you don't have *ca=""* than run : npm set ca='' as well validate that *strict_ssl = false*.(If you get
errpr while you execute npm install, you may run : *npm cache clean* to fix some of them.)
- check if you have already installed on your machine JDK( you may download from [Oracle]( http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html )
appropriate version for your system operation). If you don't have it, than install it. This will be needed when protractor starts Selenium Server.
- run in *cmd window*( as administrator) the command: *npm install -g protractor*

#### To run protractor to test your app do:
    - open a *cmd window* and run next 2 commands: *webdriver-manager update --ignore_ssl*, *webdriver-manager start* and leave the window open
    (and Selenium server running).(Check your npm folder, *C:npm/node_modules/protractor/node_modules/webdrivermanger-selenium* to see if above 2 comands download
    coresponding files there.)
    - open a second *cmd window* and changecd directory/navigate to src/e2e ( this is the folder where your e2e test scripts will be hosted). Being there run command : *protractor conf.js*
    The test should run and you should be able to see test results.


###### Features
 * TypeScript
 * Angular 2.X
 * Webpack 2.2
 * Responsive layout
 * High resolution
 * Bootstrap 4 CSS Framework
 * Sass
 * jQuery
 * Charts (Chartist, Chart.js)
 * and many more!
 
###### Note: 
This info is not a lesson about *NodesJs* or *npm* or any technology used in this project. It is
 to be used as a minimal info/help about what is here and how it should work.(_Feb 08, 2017 by Liviu Cornea_)