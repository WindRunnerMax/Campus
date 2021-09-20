const path = require("path");
const { promisify } = require("util");
const fs = require("fs");

const root = process.cwd();
const source = root + "/src/components";
const target = root + "/dist/package";

const copyFolder = (from, to) => {
    if (fs.existsSync(from)) {
        if (!fs.existsSync(to)) fs.mkdirSync(to);
        const files = fs.readdirSync(from, { withFileTypes: true });
        for (let i = 0; i < files.length; i++) {
            const item = files[i];
            const fromItem = path.join(from, item.name);
            const toItem = path.join(to, item.name);
            if (item.isFile()) {
                const readStream = fs.createReadStream(fromItem);
                const writeStream = fs.createWriteStream(toItem);
                readStream.pipe(writeStream);
            } else {
                fs.accessSync(path.join(toItem, ".."), fs.constants.W_OK);
                copyFolder(fromItem, toItem);
            }
        }
    }
};

const start = async dir => {
    console.log(dir);
    const items = await promisify(fs.readdir)(dir);
    items.forEach(async item => {
        const fullPath = path.join(dir, item);
        const stats = await promisify(fs.stat)(fullPath);
        if (stats.isDirectory()) {
            copyFolder(fullPath, target + "/" + item);
        }
    });
    fs.access(target + "/" + ".npmrc", fs.constants.F_OK, err => {
        if (err) {
            fs.writeFile(
                target + "/.npmrc",
                "registry=https://registry.npmjs.org/",
                {
                    flag: "w+",
                },
                () => {}
            );
        }
    });
};

start(source);
