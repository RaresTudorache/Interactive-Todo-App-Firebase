const {admin, db} = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

const{
    validateLoginData,
    validateSignupData
} = require('../util/validations');