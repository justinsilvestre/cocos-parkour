# Cocos2d-JS v3.9 "Parkour" Tutorial with Webpack+Babel

I'll be updating this as I progress through the [official Cocos2d-JS tutorial][tut]. I've opted to use Webpack to easily manage dependencies and use the ES6 syntax.

#### What is Cocos2d-JS?
From the official site:

> Cocos2d-JS is an open source game engine for web games and native games. It has a high performance, is user-friendly and supports multi-platform development. Supported platforms include web, Android, iOS, Windows Phone 8, Mac, Windows, etc. Cocos2d-JS makes 2D game programming easier and faster. It clarifies the key components of 2D game programming by being easy to learn and having an easy to use API. All of this combined makes it an outstanding framework compared to others.


#### Run the game in your browser
```sh
$ npm install
$ webpack
$ cocos run -p web
```
If you don't have the [Cocos Console Tool][con] installed you can replace that last command with something like `$ python -m SimpleHTTPServer` to run a server from the repo directory, and then navigate to *index.html* in your browser.

#### Run the game on Android
In addition to the [Cocos Console Tool][con], you'll need a bunch of stuff set up depending on your system. Consult the docs or [this guy's really helpful videos][son] on the topic.

On my phone, I can only get a Cocos app running when:

1. my Android SDK version number is smaller than 23
2. I set my target SDK version number to 14 in my AndroidManifest.xml (add `android:targetSdkVersion="14"` to the `uses-sdk` tag).

Assuming you've got a recent version of Android OS on your phone/tablet, you should be able to plug it in with USB debugging enabled and start up the game with these commands:
```sh
$ npm install
$ webpack
$ cocos run -p android
```



   [tut]: <https://github.com/chukong/cocos-docs/tree/master/tutorial/framework/html5/parkour-game-with-javascript-v3.0>
   [con]: <http://www.cocos2d-x.org/wiki/Cocos2d-console>
   [son]: <https://www.youtube.com/channel/UCkJYfCcenyjHr3DZ9JWHbkQ>

