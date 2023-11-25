import express from 'express';
import loanRoutes from './routes/loanRoutes';
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Adding Routes
app.use('/loan', loanRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
