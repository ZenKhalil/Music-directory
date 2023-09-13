import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import artistRouter from './routes/artistRoutes.js';
import albumRouter from './routes/albumRoutes.js';
import trackRouter from './routes/trackRoutes.js';

const app = express();

// Middleware til at parse JSON requests
app.use(bodyParser.json());

// Brug CORS middleware
app.use(cors()); // Dette vil tillade alle origins. 

// Brug routes
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
