var torrentStream = require('torrent-stream')
const _ = require('lodash');
let engs = [];
const path = require('path')
const parseRange = require('range-parser')
let tr = [
  "udp://open.demonii.com:1337/announce",
  "udp://tracker.openbittorrent.com:80",
  "udp://tracker.coppersurfer.tk:6969",
  "udp://glotorrents.pw:6969/announce",
  "udp://tracker.opentrackr.org:1337/announce",
  "udp://torrent.gresille.org:80/announce",
  "udp://p4p.arenabg.com:1337",
  "udp://tracker.leechers-paradise.org:6969",
  "udp://p4p.arenabg.ch:1337",
  "udp://tracker.internetwarriors.net:1337"
];
const convertFile = file => {
    try {
      const convertedFile = new FFmpeg(file.createReadStream())
        .videoCodec("libvpx")
        .audioCodec("libvorbis")
        .format("webm")
        .audioBitrate(128)
        .videoBitrate(8000)
        .outputOptions([`-threads 5`, "-deadline realtime", "-error-resilient 1"])
        .on("error", err => {});
      return convertedFile;
    } catch (err) {
      return file.createReadStream();
    }
  };
  const needToConvert = ext =>{
    if(ext === "webm" || ext === "mkv")
      return true;
    else
    return false
  }


  const getTorrentFile = (hash) =>{
    let engine = torrentStream('magnet:?xt=urn:btih:'+ hash, {
      tmp: "./src/movies_Hash",
      tr : tr
    })
   
    return new Promise((resolve, reject) =>{
      let b = _.find(engs, {hash: hash});
      if (typeof(b) === "object")
      {
        engine = b.engine
        engine.files.forEach(function (file, idx) {
          const ext = path.extname(file.name).slice(1);
          if (ext === 'mkv' ||
              ext === 'mp4' ||
              ext === 'flv' ||
              ext === 'webm' ||
              ext === 'wmv' ||
              ext === 'vob' ||
              ext === 'avi' ||
              ext === 'mov') {
            file.ext = ext;
            resolve(file);
          }
        });
      }
      else{
        engine.on('ready', function() {
              engine.files.forEach(function (file, idx) {
                const ext = path.extname(file.name).slice(1);
                if (ext === 'mkv' ||
                ext === 'mp4' ||
                ext === 'flv' ||
                ext === 'webm' ||
                ext === 'wmv' ||
                ext === 'vob' ||
                ext === 'avi' ||
                ext === 'mov') {
                  engs.push({engine, hash})
                  file.ext = ext;
                  resolve(file);
                }
              })
        })
      }
    })
  }

  const streaming = (req, res) =>{
    const hash = req.params.hash
    res.setHeader('Accept-Ranges', 'bytes');
    getTorrentFile(hash)
    .then((file)=>{
      const conv = needToConvert(file.ext);
      if(!conv)
      {
        res.setHeader('Content-Length', file.length);
      res.setHeader('Content-Type', `video/${file.ext}`);
      const ranges = parseRange(file.length, req.headers.range, { combine: true });
      if (ranges === -1) {
        // 416 Requested Range Not Satisfiable
        res.statusCode = 416;
        return res.end();
      } else if (ranges === -2 || ranges.type !== 'bytes' || ranges.length > 1) {
        // 200 OK requested range malformed or multiple ranges requested, stream entire video
        if (req.method !== 'GET') return res.end();
        return file.createReadStream().pipe(res);
      } else {
        // 206 Partial Content valid range requested
        const range = ranges[0];
        res.statusCode = 206;
        res.setHeader('Content-Length', 1 + range.end - range.start);
        res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${file.length}`);
        if (req.method !== 'GET') return res.end();
        return file.createReadStream(range).pipe(res);
      }
    }
      else
      {
        convertFile(file).pipe(res);
      }
       
      
      
    }).catch(function (e) {
      console.error(e);
      res.end(e);
    });

  }
  module.exports = streaming;