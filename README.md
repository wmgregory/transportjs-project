# transportjs-project

## Installation

First install `NodeJS` which comes with `NPM` installed (official site: [nodejs.org](https://nodejs.org/en/))

Update `npm` with command below:
```bash
sudo npm install npm -g
```

Then install `Bower` and `Grunt`:
```bash
 npm install -g bower grunt-cli
```

`CSS` is using `Bootstrap` and `SASS`, so you need to get `Compass` framework:
```bash
gem update --system
gem install compass

#or if you are using Mac with El Captain, correct commands will be:

sudo gem update --system
sudo gem install -n /usr/local/bin compass
```

Last two things you must do is install node packages for the project:
```bash
npm install
```

And bower modules for the project:
```bash
bower install
```

## Grunt tasks

Runs a node server (http://localhost:8000) with livereload (html/js/css) with `compass watch`
```bash
grunt serverLive
```

Runs a node server (http://localhost:8000) with `compass watch`
```bash
grunt server
```

Collects, concatenates, minificates and stores in public/dist directory .js and .css files with .min extension
```bash
grunt dist
```

Compiles css with `Compass`:
```bash
grunt compassCompile
```
