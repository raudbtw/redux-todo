const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/todos", (req, res) => {
  const todos = fs.readFileSync("todos.json");
  return res.send(todos);
});

app.listen(3333, () => {
  console.log("Server load ");
});

app.post("/todos", (req, res) => {
  const todos = fs.readFileSync("todos.json");
  const data = JSON.parse(todos);

  const newTodo = {
    ...req.body,
  };

  data.push(newTodo);

  fs.writeFileSync("todos.json", JSON.stringify(data));

  return res.send(JSON.stringify(newTodo));
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params["id"];
  const todos = fs.readFileSync("todos.json");

  const data = JSON.parse(todos);
  const index = data.findIndex((todo) => todo.id == id);

  if (index !== -1) {
    const editTodo = {
      ...req.body,
    };
    data.splice(index, 1, editTodo);
    fs.writeFileSync("todos.json", JSON.stringify(data));
    return res.send(editTodo);
  }
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params["id"];
  const todos = fs.readFileSync("todos.json");

  const data = JSON.parse(todos);

  const index = data.findIndex((todo) => todo.id == id);

  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync("todos.json", JSON.stringify(data));
    return res.send({ message: "Todo was deleted." });
  } else {
    return res.status(400).send(`Not found todo with id ${id}`);
  }
});
