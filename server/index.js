require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`server is ready for connections on port ${PORT}`);
});

//const io = require("socket.io").listen(server);
// io.on('connection', socket => {
//     socket.once('join', function (data) {
//         socket.join(data.id);
//     });
// })