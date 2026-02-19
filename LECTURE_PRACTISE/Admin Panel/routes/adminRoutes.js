const express = require("express");

module.exports = (posts) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.render("dashboard", { posts });
  });

  router.get("/posts", (req, res) => {
    res.render("posts", { posts });
  });

  router.get("/add-post", (req, res) => {
    res.render("addPost");
  });

  router.post("/add-post", (req, res) => {
    const { title, content } = req.body;

    posts.push({
      id: Date.now(),
      title,
      content,
    });

    res.redirect("/posts");
  });

  router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    posts.splice(posts.findIndex(p => p.id == id), 1);
    res.redirect("/posts");
  });

  return router;
};
