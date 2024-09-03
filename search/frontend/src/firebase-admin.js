const admin = require('firebase-admin');
const serviceAccount = require('./church-app-9d201-firebase-adminsdk-vtqqa-6924d0d939.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
