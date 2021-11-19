const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/User');
const LoginRouter = require('./routes/Login');

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Connected on port ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
