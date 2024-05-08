const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
var cors = require("cors");
const app = express()
const port = 5000
app.use(cors());
app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/student', require('./routes/student'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
