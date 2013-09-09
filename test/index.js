var pman = require('../lib/pman')
var should = require('should')


describe('pman', function() {
  it('Parses Postgres URL correctly', function() {
    var POSTGRES_URL = 'postgres://testuser:fakepassword@1-2-3-4.random-1.somehost.com:5932/dbtest'

    pman.parseDatabaseURL(POSTGRES_URL, function(pgEnv) {
      pgEnv.should.have.property('PGHOST')
      pgEnv.PGHOST.should.not.be.empty

      pgEnv.should.have.property('PGPORT')
      pgEnv.PGPORT.should.not.be.empty

      pgEnv.should.have.property('PGUSER')
      pgEnv.PGUSER.should.not.be.empty

      pgEnv.should.have.property('PGPASSWORD')
      pgEnv.PGPASSWORD.should.not.be.empty

      pgEnv.should.have.property('PGDATABASE')
      pgEnv.PGDATABASE.should.not.be.empty

    })
  })

  it('Fails given a bad command', function(done) {
    pman.execute({}, 'fake-computer-command-123', function(stderr, stdout) {
      stderr.should.exist
      stderr.should.not.be.empty

      done()
    })
  })

  it('Proxies STDERR from given command', function(done) {
    pman.execute({}, 'ping', function(stderr, stdout) {
      stderr.should.exist
      stderr.should.not.be.empty

      done()
    })
  })

  it('Proxies STDOUT from given command', function(done) {
    pman.execute({}, 'echo \'hello\'', function(stderr, stdout) {
      stdout.should.exist
      stdout.should.not.be.empty

      done()
    })
  })
})
