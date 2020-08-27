const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry:'./src/main.js',
    output:{
        path: path.resolve(__dirname,"dist"),// 动态获取路径
        filename: 'bundle.js',
        // publicPath: 'dist/' // 加上public之后，以后只要是涉及到url的内容都会自动给拼接上publicPath
    },
    module:{
        rules: [
            {
                test: /\.css$/i,//匹配真正的点，$表示结尾，匹配所有的css文件
                // css-loader只负责将css文件进行加载，不负责解析使其生效
                // 为了让其生效需要再安装一个loader
                // style-loader负责将样式添加到DOM中让其生效
                // 在webpack里面读取是从右向左读取的，因此将css-loader放在右边，优先加载，然后添加样式
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'img/[name].[hash:8].[ext]'
                        },
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['es2015']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
          ]
    },
    resolve: {
        // alias 别名
        extensions:['.js','.vue','.css'],
        alias:{
            // 给vue起了一个别名，这样在每次导入vue的时候，编译器会先来检查
            // 看vue是否指向了一个具体的文件夹
            // 这里就是将vue指向了具体的文件夹，该文件夹下包含了compiler
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
            }
        ),
        new uglifyJsPlugin()
    ],
    devServer:{
        contentBase: "./dist",
        inline:true,
    }
};