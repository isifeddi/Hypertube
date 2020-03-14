require('dotenv').config();
const passport = require("passport");
const passportSetup = require("./src/Config/passport-setup");
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`server is ready for connections on port ${PORT}`);
});