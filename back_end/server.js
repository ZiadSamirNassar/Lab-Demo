import express from 'express';
const app = express();
import bootstrap from './src/app.controller.js'
const port = 3000;

bootstrap(app, express);

app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
