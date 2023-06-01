const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = "Admin@123"

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
// Load hash from your password DB.
bcrypt.compare(password, hash, function(err, result) {
    // result == true
});