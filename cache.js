const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

module.exports = {
    clear: () => {
        rimraf(path.join(process.__rootdir, '/.cache/'), () => {
            fs.mkdirSync(path.join(process.__rootdir, '/.cache/'));
            fs.writeFileSync(path.join(process.__rootdir, '/.cache/README.md'), '### DON\'T DELETE THIS FILE');
        });
    }
}