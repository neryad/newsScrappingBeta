const PORT = 8080;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const url = 'https://listindiario.com/';
axios(url)
  .then((response) => {
    const html = response.data;

    const $ = cheerio.load(html);
    const articles = [];
    $('.row_item', html).each(function () {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');
      const image = $(this).find('img').attr('src');
      articles.push({ title, url, image });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));
/*
 * funcion con invervalo de 5 minutos
 */
// var intevalo = setInterval(logs, 300000);
// function logs() {
//   hora = new Date().toLocaleString();
//   console.log('Tempo', hora);
// }
app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
