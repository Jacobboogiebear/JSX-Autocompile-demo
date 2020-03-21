//Get dependencies
const BABEL = require('@babel/core');
const SHA = require('sha.js');
const randomstring = require('randomstring');
const path = require('path');
const fs = require('fs');

//Create sendFile ID
const sendFile = `__${randomstring.generate(25)}_sendFile`;

//Create export
module.exports = (req, res, next) => {
    res[sendFile] = res.sendFile;
    res.sendFile = (filepath) => {
        if (filepath.endsWith('.jsx')) {
            const filename = SHA('sha256').update(filepath).digest('hex');
            const cache = path.join(path.dirname(require.main.filename), '/.cache/', filename);
            if (!fs.existsSync(cache)) {
                const code = BABEL.transform(fs.readFileSync(filepath, 'utf8'), {
                    presets: ['@babel/preset-react', 'babel-preset-minify']
                });
                fs.writeFileSync(cache, code.code);
                res.send(code.code);
            } else {
                res[sendFile](cache);
            }
        } else {
            res[sendFile](filepath);
        }
    }
    next();
}