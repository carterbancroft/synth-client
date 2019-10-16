# Synth Client
A simple drum machine built with Tone.js and React.

## Requirements
- [Node.js](https://nodejs.org/en/download/) (preferably v12)

## Getting Setup and Running it
Once you have Node.js installed all you need to do is install dependencies and run the app using npm scripts.

```
$ npm install
$ npm start
```

`npm start` will start a Webpack development server, run the app on top of it and open the app in Chrome. Hot reloading is enabled so any code changes will reload the app.

## Creating a production build
If you'd like to create a production build run:

```
$ npm run build
```

This will generate a compiled build using Webpack/Babel and store the production build in the /dist directory in the root of this repository. Run the production app by opening `index.html`.

## Stack
- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

See [package.json](https://github.com/carterbancroft/synth-client/blob/master/package.json) for a list of all dependecies.
