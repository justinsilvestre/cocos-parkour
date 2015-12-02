# Cocos2d-JS v3.9 "Parkour" Tutorial with Webpack+Babel

I'll be updating this as I progress through the [official Cocos2d-JS tutorial][tut]. I've opted to use Webpack to easily manage dependencies and use the ES6 syntax.

#### Run the game in your browser
Make sure you've installed the [Cocos Console Tool][con]. 
```sh
$ npm install
$ webpack
$ cocos run -p web
```

#### Run the game on Android
Besides the Cocos Console Tool, you'll need a bunch of stuff set up depending on your system. Consult the docs or [this guy's really helpful videos][son] on the topic.

On my phone, I can only get a Cocos app running when:
1. my Android SDK version number is smaller than 23
2. I set my target SDK version number to 14 in my AndroidManifest.xml (add `android:targetSdkVersion="14"` to the `uses-sdk` tag).

Then I plug in my phone with USB debugging enabled and run these commands:
```sh
$ npm install
$ webpack
$ cocos run -p android
```

#### What is Cocos2d-JS?
From the official site:

> Cocos2d-JS is an open source game engine for web games and native games. It has a high performance, is user-friendly and supports multi-platform development. Supported platforms include web, Android, iOS, Windows Phone 8, Mac, Windows, etc. Cocos2d-JS makes 2D game programming easier and faster. It clarifies the key components of 2D game programming by being easy to learn and having an easy to use API. All of this combined makes it an outstanding framework compared to others.



   [tut]: <https://github.com/chukong/cocos-docs/tree/master/tutorial/framework/html5/parkour-game-with-javascript-v3.0>
   [con]: <http://www.cocos2d-x.org/wiki/Cocos2d-console>
   [son]: <https://www.youtube.com/channel/UCkJYfCcenyjHr3DZ9JWHbkQ>

