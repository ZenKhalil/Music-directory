import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import artistRouter from './backend/routes/artistRoutes.js';
import albumRouter from './backend/routes/albumRoutes.js';
import trackRouter from './backend/routes/trackRoutes.js';
import { setupAssociations } from './backend/models/associations.js';

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Set up associations
setupAssociations();

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Use routes for API
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

// Catch-all route to serve the frontend application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
