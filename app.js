const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes/transaction.routes");

const app = express();

app.use(bodyParser.json());

const db = require('./models/index.js');
db.sequelize.sync();

//use for developement purpose in case of force drop of table
// db.sequelize.sync({force: true}).then(()=> {
//     console.log("drop and resync db");
// });

app.get('/', (req, res) => {
    res.json({message: "Transactions are welcome now!"})
});

routes(app);

const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`listening to port : ${port}`);
});