var http = require('http')
var url = require('url')
var fs = require('fs')
var date = require('./modules/date')

http.createServer(function(request, response) {

  var query = url.parse(request.url, true)
  var path = query.pathname

  if(path == '/' || path == 'index' || path == 'index.html' || path == ''){
    path = 'index.html'
  }

  fs.readFile('templates/' + path, function(error, data) {

    if (error) {
      response.writeHead(404, {
        'Content-Type': 'text/html'
      })
      return response.end()
    }

    var queryParams = query.query
    var name = 'Unnamed'

    if (queryParams.name) {
      name = queryParams.name
    }

    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.write('Current time is ' + date.myDateTime())
    response.write('<br>You are accessing from ' + request.url)
    response.write('<br>You said your name is ' + name)
    response.write('<br>')

    return response.end(data)
  })
}).listen(8080)
