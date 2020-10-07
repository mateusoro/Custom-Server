var dataset_links = [];
  
var url = require('url');
var magnet = require("magnet-uri");
const cheerio = require('cheerio');
var request = require('sync-request');
var express = require('express');

lista('https://ondeeubaixo.net/-',1,2)

function lista(tipo, ini, tamanho) {

    for (i = ini; i < (ini + tamanho); i++) {

        var p = tipo + i;
        l(p);
        var res = request('GET', p);
        var data = res.getBody('utf8');
        carregar_links(data);
    }
    retorno_carregar_links();
   

}
function carregar_links(data) {

//append(data[1]);

    const $ = cheerio.load(data);

    var titulos = $('.list-inline > li');

    titulos.each(function (index, elem) {

        var link = $(this).find('a')[0].attribs.href;
        var dublado = $(this).find('.idioma_lista').text().trim();

        if (dublado == "Dublado") {
            l(link);
            dataset_links.push(link);
        }
    });
}
function retorno_carregar_links() {

    l('retorno_carregar_links');
    for (var n = 1; n < dataset_links.length; n++) {

        var p = dataset_links[n];
        var res = request('GET', p);
        const $ = cheerio.load(res.getBody('utf8'));      
        $("a[href*='magnet:?xt=urn']").each(function (index, elem) {
            
            var mag = this.attribs.href;
            var parsed = magnet(mag);
            l(parsed.infoHash);       

        });
    }

}
function l(log) {
    console.log(log);
}