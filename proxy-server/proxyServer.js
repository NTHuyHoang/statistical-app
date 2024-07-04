const express = require('express');
const request = require('request');
const app = express();

app.get('/api/getdata', (req, res) => {
    const url = 'http://sanslab.ddns.net:5001/api/getdata?device_name=device_2';
    req.pipe(request(url)).pipe(res);
});

app.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});
