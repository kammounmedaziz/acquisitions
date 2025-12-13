import app from './app.js';

const port = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  if (host === '0.0.0.0') {
    console.log(`Access the app at http://localhost:${port}`);
  }
});
