# Integrando express con webpack

Para implementar express con webpack se debe incluir algunas cosas, primero instalar `npm install webpack-dev-middleware webpack-hot-middleware -D`

despues de eso se debe incluir webpack en el archivo principal del servidor

````javascript 

import webpack from "webpack"

...

if( ENV === "development" ){
    console.log("Development config");
    const webpackConfig = require("../../webpack.config");
    const webpackDevMiddleware = require("webpack-dev-middleware"); 
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const compiler = webpack(webpackConfig);
    const serverConfig = { serverSideRender: true };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
}

````

despues de realizar los ajustes pertinentes se debe cambiar el webpack del modo de desarrollo al modo normal en el ``packaje.json``

Finalmente se debe realizar un cambio de configuracion en el webpack.plugin

````javascript 
...
const webpack = require("webpack");
module.exports = {
    entry: ['./src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
    ...
    plugins: [
        ...
        new webpack.HotModuleReplacementPlugin(),
    ]
}
````

finalmente se debe agregar una configuracion al archivo .babelrc

````javascript
    {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": ["react-hot-loader/babel"]
    }

````

revisar el webpack de esta configuracion, pues se deben eliminar algunas configuraciones del webpack.
Tambien se debe remplazar la plantilla del html en el request del servidor

````javascript 

app.get("*", (req, res)=> {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="assets/app.css" type="text/css">
        <title>Platzi Video</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="assets/app.js" type="text/javascript"></script>
      </body>
    </html>
    `);
});

````

Ahora para renderizar react desde el servidor se deben instalar algunas dependencias extras. `npm install history react-router-config`
