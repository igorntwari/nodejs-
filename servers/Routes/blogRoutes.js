const express = require('express')
const router = express.Router()
const Blog = require("../models/blogs");
const blogController = require('../controllers/blogController')

router.get("/", (req, res) => {
    res.redirect("/blogs");
  });

  router.post("/blogs", blogController.blog_create_post);

  router.get("/blogs",blogController.blog_index);

  router.get("/blogs/:id",blogController.blog_details);

  router.delete("/blogs/:id",blogController.blog_delete);
  
  router.get("/single-blog", (req, res) => {
    Blog.findById()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  module.exports = router