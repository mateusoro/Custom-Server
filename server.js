  
var url = require('url');
var magnet = require("magnet-uri");
const cheerio = require('cheerio');
var request = require('then-request');
var express = require('express');
const Magnet2torrent = require('magnet2torrent-js');

// https://github.com/ngosang/trackerslist
const trackers = [
    'udp://tracker.coppersurfer.tk:6969/announce',
    'udp://tracker.open-internet.nl:6969/announce',
    'udp://tracker.leechers-paradise.org:6969/announce'    
];


const m2t = new Magnet2torrent({
    trackers,
    addTrackersToTorrent: true
});


lista('https://ondeeubaixo.net/-',1,2)

function lista(tipo, ini, tamanho) {

    for (i = ini; i < (ini + tamanho); i++) {

        var p = tipo + i;
        l(p);
        var res = request('GET', p).done(function (res) {
          var data = res.getBody('utf8');
          const $ = cheerio.load(data);
          var titulos = $('.list-inline > li');
          titulos.each(function (index, elem) {

              var link = $(this).find('a')[0].attribs.href;
              var dublado = $(this).find('.idioma_lista').text().trim();

              if (dublado == "Dublado") {
                  l(link);                  
                  retorno_carregar_links(link);
              }
          });          
        });
        
    }

}

function retorno_carregar_links(p) {

      var res = request('GET', p).done(function (res) {
        const $ = cheerio.load(res.getBody('utf8'));      
        $("a[href*='magnet:?xt=urn']").each(function (index, elem) {
            
            try{
                var mag = this.attribs.href;
              
                var parsed = magnet(mag);
                m2t.getTorrent(mag).then(torrent => {
                    var arquivos = {}
                    for(var a in torrent.files){
                      arquivos[a] = torrent.files[a].name;
                    }
                    l(torrent.infoHash);       
                    l(arquivos);

                }).catch(e => {
                    // Timeout or error occured
                    console.error(e);
                });
            }catch(e){
              l(mag);
              console.log('Erro')
            }

        });
    });

}
function l(log) {
    console.log(log);
}