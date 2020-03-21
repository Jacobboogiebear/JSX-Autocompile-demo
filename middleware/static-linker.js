//Get dependencies
const path = require('path');
const fs = require('fs');

//Create export
module.exports = (defaultpath) => {
    return (req, res, next) => {
        const filepath = path.join(path.dirname(require.main.filename), defaultpath, req.path);

        if (fs.existsSync(path.join(filepath, 'index.html'))) {
            res.sendFile(path.join(filepath, 'index.html'));
        } else if (fs.existsSync(filepath)) {
            res.sendFile(filepath);
        } else {
            next();
        }
    };
};