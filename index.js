const express = require('express');

const path = require('path');

const port = 8000;

const app = express()

const db = require('./confing/db');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname,'assets')))
app.use(express.urlencoded())


app.use('/', require('./routers'))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log('server is run');
})