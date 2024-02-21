
const Blog = require('../models/blogs')

const blog_index = (req,res)=> {
    Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { tittle: "all blogs", blogs: result });
    })
    .catch((error) => {
      console.log(error);
    });
}

const blog_details = (req,res)=> {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render("details", { tittle: "blog details", blog: result });
    })
    .catch((error) => {
        console.log(error);
    });
}

const blog_create_post = (req, res)=> {
    const blog = new Blog(req.body);
    blog
      .save()
      .then((result) => {
        res.redirect("/blogs");
      })
      .catch((error) => {
        console.log(error);
      });
}

const blog_delete = (req,res)=> {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => console.log(err));
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_post,
    blog_delete
}