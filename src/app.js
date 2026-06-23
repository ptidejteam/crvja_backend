import express from 'express';
import transpilerRoutes from './routes/transpiler.routes.js'; 

const app = express();

// Standard middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('CRVJA 🍺');
});

app.get('/api', (req, res) => {
  res.status(200).send('API 🍻');
});

// Mount the transpiler routes
app.use('/api/transpile', transpilerRoutes); 

export default app;