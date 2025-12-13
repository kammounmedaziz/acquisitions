import express from 'express';

const app = express();

// log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  console.log('Route / hit');
  res.send('Hello, World!');
});

export default app;
