const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("home", { posts });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    id: Date.now().toString(), // Unique ID
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.send("Post not found");
  }
});

app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
