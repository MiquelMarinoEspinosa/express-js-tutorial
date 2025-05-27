const app = require('./app');

//Create a server
const port = 3000;
app.listen(port, () => {
    console.log('server has started...');
});
