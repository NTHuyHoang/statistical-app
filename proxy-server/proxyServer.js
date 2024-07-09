const express = require('express');
const request = require('request');
const app = express();

app.get('/api/enviromentdata', (req, res) => {
    const url = 'http://sanslab.ddns.net:5001/api/getdata?device_name=device_2';
    req.pipe(request(url)).pipe(res);
});
app.get('/api/soildata1', (req, res) => {
    const url = 'http://sanslab.ddns.net:5001/api/getdata?device_name=device_1';
    req.pipe(request(url)).pipe(res);
});
app.get('/api/soildata2', (req, res) => {
    const url = 'http://sanslab.ddns.net:5001/api/getdata?device_name=device_3';
    req.pipe(request(url)).pipe(res);
});

app.listen(4000, () => {
    console.log('Proxy server listening on port 4000');
});
