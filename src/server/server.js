import express from "express";
import { config } from "dotenv";
config();
import webpack from "webpack"
const { ENV, PORT } = process.env;
const app = express();

if( ENV === "development" ){
    console.log("Development config");
    const webpackConfig = require("../../webpack.config");
    const webpackDevMiddleware = require("webpack-dev-middleware"); 
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const compiler = webpack(webpackConfig);
    const serverConfig = { 
        serverSideRender: true
     }

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
}
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

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    else console.log("Server running on port ", PORT); 
})