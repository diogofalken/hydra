const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Ma Naem Jeff!',
  });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}...`);
});
