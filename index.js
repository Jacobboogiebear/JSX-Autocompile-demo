const express = require('express');
const app = express();
const cache = require('./cache');
process.__rootdir = __dirname;
cache.clear();


app.use(require('./middleware/jsx-parser'));
app.use(require('./middleware/static-linker')('public'));
    
app.listen(3000);