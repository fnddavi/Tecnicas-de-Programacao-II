import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import connect from './models/Conections';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

// Chama a função de conexão definida em src/models/Conection
connect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});