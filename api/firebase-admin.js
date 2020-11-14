const admin = require("firebase-admin");
const serviceAccount = require("/api/sdga-ce4cd-firebase-adminsdk-6ekab-a918323c56.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sdga-ce4cd.firebaseio.com"
});
