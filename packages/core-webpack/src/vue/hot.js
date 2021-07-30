import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import webpack from 'webpack';
import * as fs from 'fs';
import { getDevConfig } from './dev';
export let DevMiddlewareFileSystem = fs;

export class Hotwebpack {
    constructor(app, page = true) {
        this.app = app;
        this.webpackConfig = getDevConfig(page, false, true);
        this.complier = webpack(this.webpackConfig);
        this.webpackDevMiddleware();
        this.webpackHotMiddleware();
    }
    webpackHotMiddleware() {
        let _hotMiddleware = hotMiddleware(this.complier, {
            log: console.warn,
            heartbeat: 2000
        });
        this.app.use(_hotMiddleware);
    }
    webpackDevMiddleware() {
        let _devMiddleware = devMiddleware(this.complier, {
            publicPath: '/',
            noInfo: true,
            quiet: true,
            index: false //不响应根路径请求 避免和页面组件路由冲突
        });
        DevMiddlewareFileSystem = _devMiddleware.fileSystem;
        this.app.use(_devMiddleware);
    }
}
