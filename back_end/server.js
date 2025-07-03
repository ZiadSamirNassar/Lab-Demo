const express = require('express');
const app = express();
const bootstrap = require('./src/app.controller')
const port = 3000;

bootstrap(app, express);

app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
