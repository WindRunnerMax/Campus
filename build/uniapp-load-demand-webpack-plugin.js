export class UniappLoadDemandWebpackPlugin {
    constructor(options) {
        this.options = options || {};
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync("UniappLoadDemandWebpackPlugin", (compilation, done) => {
            Object.keys(compilation.assets).forEach(key => {
                if (/^\./.test(key)) return void 0;
                if (!/.*\.json$/.test(key)) return void 0;
                const root = "node-modules";
                const asset = compilation.assets[key];
                const target = JSON.parse(asset.source());
                if (!target.usingComponents) return void 0;
                Object.keys(target.usingComponents).forEach(componentsKey => {
                    const item = target.usingComponents[componentsKey];
                    if (item.indexOf("/" + root + "/" + this.options.libraryName) === 0) {
                        target.usingComponents[
                            componentsKey
                        ] = `/${root}/${this.options.libraryName}/${this.options.libDir}/${componentsKey}/index`;
                    }
                });
                compilation.assets[key] = {
                    source() {
                        return JSON.stringify(target);
                    },
                    size() {
                        return this.source().length;
                    },
                };
            });
            done();
        });
    }
}

/*
module.exports = {
    configureWebpack: {
        // ...
        plugins: [
            // ...
            new UniappLoadDemandWebpackPlugin({
                libraryName: "shst-campus",
                libDir: "src/components",
            }),
            // ...
        ],
        // ...
    },
};
*/
