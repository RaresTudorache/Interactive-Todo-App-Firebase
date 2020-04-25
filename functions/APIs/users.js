const {admin, db} = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

const{
    validateLoginData,
    validateSignupData
} = require('../util/validators');

//login

exports.loginUser = (request,response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const {valid, errors} = validateLoginData(user);
    if(!valid) return response.status(400).json(errors);

    firebase
            .auth().signInWithEmailAndPassword(user.email, user.password)
            .then( (data) => {
                return data.user.getIdToken();
            })
            .then((token)=> {
                return response.json({token});
            })
            .catch((error)=> {
                return response.status(403).json({general: 'wrong credetinals, please try again'});
            })
};