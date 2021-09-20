const transform = str => str.replace(/\B([A-Z])/g, "-$1").toLowerCase();
module.exports = function (source) {
    const name = this.query.name;
    if (!name) return source;
    const path = this.query.path || "lib";
    const main = this.query.main;
    return source.replace(
        // maybe use parse-imports to parse import statement
        new RegExp(
            `import[\\s]*?\\{[\\s]*?([\\s\\S]*?)[\\s]*?\\}[\\s]*?from[\\s]*?['"]${name}['"];?`,
            "g"
        ),
        function (_, $1) {
            let target = "";
            $1.split(",").forEach(item => {
                const transformedComponentName = transform(item.split("as")[0].trim());
                const single = `import { ${item} } from "${name}/${path}/${transformedComponentName}/${
                    main || transformedComponentName
                }";`;
                target = target + single;
            });
            return target;
        }
    );
};

/*
// vue.config.js
module.exports = {
    transpileDependencies: ["shst-campus"],
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "./src"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "shst-campus/build/components-loader",
                    options: {
                        name: "shst-campus",
                        path: "src/components",
                        main: "index",
                    },
                },
            ],
        },
        plugins: [],
    },
};
*/
