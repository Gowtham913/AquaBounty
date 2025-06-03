import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use your cert.pem and key.pem
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('✅ Secure API is live');
});

// Connect database & cloud
connectDB();
connectCloudinary();

// Start HTTPS server
https.createServer(sslOptions, app).listen(port, '0.0.0.0', () => {
  console.log(`🔐 HTTPS Server running at https://0.0.0.0:${port}`);
});