const express = require("express");
const morgan = require("morgan");
const app = express();
const Blogroutes = require("./Routes/blogRoutes");
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://igorntwaliblog:test1234@cluster0.8n7pjgy.mongodb.net/blogsDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((Err) => {
    console.log(Err);
  });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

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

app.get("/about", (req, res) => {
  res.render("about", { tittle: "About" });
});

app.get("/about/create", (req, res) => {
  res.render("create", { tittle: "Create" });
});
// blogs routes
app.use(Blogroutes);

app.use((req, res) => {
  res.status(404).render("404", { tittle: "Notfound" });
});
