var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
var chai = require('chair');
var db;

describe('User', function() {

    before(function(done) {
        mongoose.connect(config.mongoDB);
        db = mongoose.connection;
        db.on('error', function(error) {
            done(error);
        });
        db.once('open', function () {
          done();
        });
    })

    beforeEach(function(done) {
        db.dropDatabase();
    });

    describe('Creation', function() {

        it('should fail when not supplied a username', function() {

            var malformedUser = {

            }

            

        });

    });
});