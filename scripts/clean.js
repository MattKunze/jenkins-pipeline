var spawn = require('child_process').spawn
var os = require('os')

var deleteDirectory = function(path) {
  return new Promise(function(resolve, reject) {
    var command;
    var args = []
    if (os.platform() === 'win32') {
      command = 'cmd'
      args = [ '/c', 'rmdir', '/s', '/q' ]
    } else {
      command = 'rm'
      args = [ '-rf' ]
    }
    args.push(path)

    console.log('Executing ' + command + ' ' + args.join(' '))
    var child = spawn(command, args)
    child.stdout.on('data', function(data) {
      // rmdir returns an error on Windows if the directly doesn't exist which
      // we want to ignore
      var message = String(data).trim()
      if(message === "The system cannot find the file specified.") {
        resolve()
      }
      else {
        console.error(message)
        reject()
      }
    })
    child.stderr.on('data', function(data) {
      console.error(String(data).trim())
      reject()
    })
    child.on('close', function() {
      resolve()
    })
  })
}

var paths = process.argv.slice(2)
var current = Promise.resolve();
Promise.all(paths.map(function(path) {
  current = current.then(function() {
    return deleteDirectory(path)
  })
}))
