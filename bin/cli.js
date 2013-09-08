var pman = require('../lib/pman')
var argv = require('optimist')
  .string('app')
  .alias('app', 'a')
  .describe('app', 'Heroku Application')
  .argv


pman.getHerokuDatabase(argv.app, function(err, env) {
  if (err) console.error(err)
  else pman.execute(env, argv._.join(' '), function(err, stdout) {
    if (err) console.error(err)
    else console.log(stdout)
  })
})
