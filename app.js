const express = require("express");
const data = require("./db.json");

const app = express();

app.use(express.json());

app.get("/getData", (req, res) => {
  res.send(data);
});

app.post("/insertData", (req, res) => {
  const checkDupe = data.find((l) => l.name === req.body.name);
  if (checkDupe) {
    res.send({
      Status: false,
      Message: "Duplicate name",
    });
  } else {
    data.push(req.body);
    res.status(200).json(req.body);
  }
});

app.post("/deleteData", (req, res) => {
  const deletedIndex = data.findIndex((l) => l.name === req.body.name);
  if (deletedIndex >= 0) {
    data.splice(deletedIndex, 1);
    res.status(200).send(req.body);
  } else {
    res.send({
      Status: false,
      Message: "Name not found",
    });
  }
});

app.post("/updateStatus", (req, res) => {
  const updateIndex = data.findIndex((l) => l.name === req.body.name);
  if (updateIndex >= 0) {
    Object.assign(data[updateIndex], req.body);
    res.status(200).send(req.body);
  } else {
    res.send({
      Status: false,
      Message: "Name not found",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
