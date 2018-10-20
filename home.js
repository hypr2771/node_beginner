var http = require('http')
var formidable = require('formidable')
var fs = require('fs')

http.createServer(function(request, response) {

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  if (request.url == '/fileupload') {
    var form = new formidable.IncomingForm()
    form.parse(request, function(error, fields, files) {
      var tempPath = files.filetoupload.path
      var newPath = '/home/vince/Workspace/Node/node_beginner/uploads/' + files.filetoupload.name

      fs.readFile(tempPath, function(error, data) {
        if (error) throw error
        console.log('Uploaded file read from ' + tempPath);
        console.log('Writing file at ' + newPath);

        fs.writeFile(newPath, data, function(error) {
          if (error) throw error
          console.log('File written at ' + newPath);
          response.write('File uploaded in ' + newPath)

          console.log('Removing file at ' + tempPath);
          fs.unlink(tempPath, function(error) {
            if (error) throw error
            console.log('File removed from ' + tempPath);
            response.write('<br>No temp file remains')
            response.end()
          })
        })
      })
    })
  } else {
    response.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    response.write('<input type="file" name="filetoupload"><br>');
    response.write('<input type="submit">');
    response.write('</form>');
    return response.end();
  }
}).listen(8080);
