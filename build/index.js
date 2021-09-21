const path = require("path");
const { copyFolder, readDir, fsStat, writeFile, copyFile, fileExist } = require("./utils");

const root = process.cwd();
const source = root + "/src/components";
const target = root + "/dist/package";

const toClassName = str => {
    const tmpStr = str.replace(/-(\w)/g, (_, $1) => $1.toUpperCase()).slice(1);
    return str[0].toUpperCase() + tmpStr;
};

const start = async dir => {
    const components = [];
    console.log("building");

    console.log("copy components");
    const items = await readDir(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = await fsStat(fullPath);
        if (stats.isDirectory()) {
            if (/^c-/.test(item)) {
                components.push({ fileName: item, componentName: toClassName(item) });
            }
            copyFolder(fullPath, path.join(target, "/lib/", item));
        }
    }

    console.log("processing index.js");
    let indexContent = "";
    components.forEach(item => {
        indexContent += `import ${item.componentName} from "./lib/${item.fileName}/${item.fileName}.vue";\n`;
    });
    const exportItems = components.map(v => v.componentName).join(", ");
    indexContent += `export { ${exportItems} };\n`;
    indexContent += `export default { ${exportItems} };\n`;
    await writeFile(path.join(target, "/index.js"), indexContent);

    console.log("processing index.d.ts");
    let dtsContent = `import { Component } from "vue";\n\n`;
    components.forEach(item => {
        dtsContent += `declare const ${item.componentName}: Component;\n`;
    });
    await writeFile(path.join(target, "/index.d.ts"), dtsContent);

    console.log("processing .npmrc");
    const exist = await fileExist(path.join(target, "/.npmrc"));
    if (!exist) {
        const info = "registry=https://registry.npmjs.org/";
        await writeFile(path.join(target, "/.npmrc"), info);
    }

    console.log("processing README.md");
    await copyFile(path.join(root, "/README.md"), target + "/README.md");

    console.log("processing package.json");
    const originPackageJSON = require(path.join(root, "/package.json"));
    const targetJson = {
        ...originPackageJSON,
        repository: {
            type: "git",
            url: "https://github.com/WindrunnerMax/Campus",
        },
        scripts: {},
        author: "Czy",
        license: "MIT",
        dependencies: {
            "vue": "^2.6.11",
            "vue-class-component": "^6.3.2",
            "vue-property-decorator": "^8.0.0",
        },
        devDependencies: {},
    };
    await writeFile(path.join(target, "/package.json"), JSON.stringify(targetJson, null, "\t"));
};

start(source);
