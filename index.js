import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation.json' assert{type:'json'};
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';
import tagRoutes from './src/Routes/tagRoutes.js';
import postRoutes from './src/Routes/postRoutes.js'
import userRouter from './src/Routes/userRoutes.js'

export const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(bodyParser.json());

// Routes
// Tags routes
app.use('/api/tags', tagRoutes);

// Post routes
app.use('/api/posts', postRoutes);

// User routes
app.use('/api/user',userRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start server and connect to database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
