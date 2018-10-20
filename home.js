var http = require('http')
var mails = require('./modules/mails')

http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  mails.mails()
  response.end()
}).listen(8080)
