const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

module.exports.copyFolder = async (from, to) => {
    if (fs.existsSync(from)) {
        if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
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
                module.exports.copyFolder(fromItem, toItem);
            }
        }
    }
};

module.exports.execCMD = (cmdStr, cmdPath) => {
    console.log(`cmdPath`, cmdPath);
    const workerProcess = exec(cmdStr, { cwd: cmdPath });
    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on("data", data => {
        process.stdout.write(data);
    });
    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on("data", data => {
        process.stdout.write(data);
    });
    // 退出之后的输出
    // workerProcess.on("close", code => {});
};

module.exports.fileExist = async location => {
    try {
        await promisify(fs.access)(location, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
};

module.exports.writeFile = (location, content, flag = "w+") => {
    return promisify(fs.writeFile)(location, content, { flag });
};

module.exports.readDir = dir => {
    return promisify(fs.readdir)(dir);
};

module.exports.fsStat = fullPath => {
    return promisify(fs.stat)(fullPath);
};

module.exports.copyFile = (from, to) => {
    // const readStream = fs.createReadStream(from);
    // const writeStream = fs.createWriteStream(to);
    // readStream.pipe(writeStream);
    return promisify(fs.copyFile)(from, to);
};
