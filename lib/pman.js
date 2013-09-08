var exec = require('child_process').exec
var url = require('url')
var _ = require('lodash')

var getHerokuDatabaseURL = function(app, done) {
  var baseCommand = 'heroku config:get DATABASE_URL'
  var execCommand = app ? baseCommand + ' --app ' + app : baseCommand

  exec(execCommand, function(err, stdout, stderr) {
    if (stderr) done(stderr)
    else if (err) done(err)
    else done(stderr, stdout)
  })
}

var parseDatabaseURL = function(databaseURL, done) {
  var dbObj = url.parse(databaseURL)

  done({ PGHOST: dbObj.hostname
       , PGPORT: dbObj.port
       , PGDATABASE: dbObj.pathname.replace('/', '')
       , PGUSER: dbObj.auth.split(':')[0]
       , PGPASSWORD: dbObj.auth.split(':')[1] })
}


module.exports.getHerokuDatabase = function(app, done) {
  getHerokuDatabaseURL(app, function(err, databaseUrl) {
    if (err) done(err)
    else {
      parseDatabaseURL(databaseUrl, function(pgEnv) {
        done(null, pgEnv)
      })
    }
  })
}

module.exports.execute = function(env, command, done) {
  console.log('Running ', command, '...')
  exec(command, { env: _.extend(process.env, env) },
    function(err, stdout, stderr) {
      console.log('...ok')
      if (stderr) done(stderr)
      else if (err) done(err)
      else done(stderr, stdout)
    })
}
