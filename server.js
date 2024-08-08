const express = require("express");
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors())

const jsonParser = bodyParser.json()

app.get("/api/status", (req, res) => {
  res.json({'status':'up'})
});

app.get("/consents", (req, res) => {
  let rawdata = fs.readFileSync('consents.json');
  let consents = JSON.parse(rawdata);
  res.json(consents)
});

app.post("/consents", jsonParser, (req, res) => {
  let rawdata = fs.readFileSync('consents.json');
  let consents = JSON.parse(rawdata)
  consents.push(req.body)
  let data = JSON.stringify(consents);
  fs.writeFileSync('consents.json', data);
  res.json({'success': true})
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});