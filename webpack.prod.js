const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");


module.exports = {
    mode: 'production',
    output:{
        clean: true,
        filename: "main.[contenthash].js"
    },

    module: {
        rules: [ 
            {
                test:/\.html$/,
                loader: "html-loader",
                options:{ 
                    sources: false //si hay atributos (imagenes por ejemplo) en el html tambien los mueve
                }

            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "file-loader"
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },


    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebpack({
            title: "Mi webpack app",
            // filename: "index.html" opcional pues ya viene por defecto el nombre index
            template: "./src/index.html"
        }), //relaciona el html con el main.js de la carpeta dist
        new MiniCssExtract({
            filename: "[name].[fullhash].css",
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
              ],
        })
    ]
}
//html loader => carga el html
//html webpack-plugin => inserta el archivo final js dentro de nuestro index.html (ambos aparecen en la carpeta dist)