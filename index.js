// 'use strict';

const net = require('net');
const url = require('url');
const dns = require('dns');
const http = require('http');

async function request(addr, callback) {
  const URL = url.parse(addr);
  let req;
  req = await connect(URL.hostname, URL.port || 80);
  let res = [];
  res.push(`GET ${URL.pathname} HTTP/1.1`);
  res.push(`Host: ${URL.hostname}`);
  res.push('User-Agent: curl/7.51.0; http-client/0.0.0;');
  res.push('Accept: */*');
  res.push('\r\n');
  res = res.join('\r\n')
  console.log('resString:',res);
  req.write(res);
  console.log('req:',Object.keys(req));
  const data = [];
  req.on('readable', () => {
    let chunk;
    while (null !== (chunk = req.read())) {
      console.log('------st--------');
      console.log(chunk.toString());
      console.log('------en--------');
      data.push(chunk);
    }
    console.log(Buffer.concat(data).toString());
  });
}

function connect(host, port) {
  return new Promise((resolve) => {
    const req = net.createConnection({ host, port }, () => {
        // console.log('----req:',req);
        // console.log('----req:',Object.keys(req));
      resolve(req);
    });
  });
}

request('http://chayangge.com');