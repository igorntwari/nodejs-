const express = require("express");
const morgan = require("morgan");
const app = express();
const Blog = require("./models/blogs");
const mongoose = require("mongoose");
const { result } = require("lodash");
const dbURI =
  "mongodb+srv://igorntwaliblog:test1234@cluster0.8n7pjgy.mongodb.net/blogsDB?retryWrites=true&w=majority";
mongoose
.connect(dbURI)
.then((result) => app.listen(3000))
.catch((Err) => {
  console.log(Err);
});
app.set("view engine", "ejs");
const blogs = [
  { tittle: "blog1", snippet: "this is first blog" },
  { tittle: "blog2", snippet: "this is second blog" },
  { tittle: "blog3", snippet: "this is third blog" },
];
app.use(morgan("dev"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    tittle: "first second in db",
    snippet: "watch what happened on the gym tv",
    body: "this is a blog about the gym tv and what happened to they gym tv ",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/single-blog',(req,res)=> {
  Blog.findById()
  .then((result)=> {
    res.send(result)
  }).catch((error)=> {
    console.log(error)
  })
})

app.get("/", (req, res) => {
  res.render("index", { tittle: "Home", blogs });
});
app.get("/about", (req, res) => {
  res.render("about", { tittle: "About" });
});

app.get("/about/create", (req, res) => {
  res.render("create", { tittle: "Create" });
});

app.use((req, res) => {
  res.status(404).redirect("/404", { tittle: "Notfound" });
});


