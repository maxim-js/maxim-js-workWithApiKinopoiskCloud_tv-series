var fetch = require('node-fetch');
var site = 'https://api.kinopoisk.cloud/tv-series/all/page/';
var id = 1;
var token = '/token/e7827047cf5269f1dccdeac3e90fd78c';
var url = site + id + token;
var data = [];
const fs = require('fs');

// создаём файл
fs.writeFileSync('data.json', JSON.stringify(data));

// берём старые данные
const dbData = JSON.parse(fs.readFileSync('data.json', (err, data) => (data)))


for (id = 1; id < 2; id++) {

    (async () => {
        await fetch(url, { method: 'GET' })
            .then((res) => res.json())
            .then((json) => {
                data.push(json["tv-series"])
                console.log('ЭТО МАССИВ', data)
                // сливает данные
                fs.writeFileSync('data.json', JSON.stringify([...dbData, ...data]));
                // читаем файл
                const text = fs.readFileSync('data.json', 'utf8');
                console.log(JSON.parse(text));
            })
    })();
}