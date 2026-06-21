import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Saifoodlover Cafe Backend is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// A sample cafe API endpoint
app.get('/api/cafe-info', (req, res) => {
  res.json({
    name: 'Saifoodlover Cafe',
    description: 'A premium, responsive, and luxury-themed digital ordering menu and website.',
    location: 'Badvel, Andhra Pradesh, India',
    whatsappNumber: '919949466307',
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Backend server is running at http://localhost:${PORT}`);
});
