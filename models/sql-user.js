var query = require('./query');
var passwordHash = require('password-hash');

module.exports.addUser =
function addUser(email, password, cb){
	var values = [email, passwordHash.generate(password), 1];
	var q ='INSERT INTO users(email, hash, level) values($1, $2, $3)'

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			return cb(null, result);
		}
	})
}

module.exports.findUser = 
function findUser(userData, cb){
	var values = [userData];
	var q = 'SELECT email, hash FROM users WHERE email = $1';

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			cb(null, result.rows);
		}
	});
}