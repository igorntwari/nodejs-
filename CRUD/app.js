const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Item = require("./models/item");
const databaseURI =
  "mongodb+srv://igorntwaliItem:.GaeaG*Q4.g5Jq$@cluster0.8n7pjgy.mongodb.net/itemsDB?retryWrites=true&w=majority";
mongoose
  .connect(databaseURI)
  .then((result) => app.listen("3000"))
  .catch((error) => {
    console.log(error);
  });
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  Item.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/", (req, res) => {
  const new_Item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  })
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(501).send(error);
    });
});

app.put("/:id", (req, res) => {
  Item.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send("Item not found");
      }
      const updateData = req.body;
      return Item.findByIdAndUpdate(result._id, updateData, { new: true });
    })
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(404).send("Item not found");
      }
      res.send(updatedItem);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send("item not found");
      }
      return Item.findOneAndDelete(result._id);
    })
    .then((deletedItem) => {
      res.send(deletedItem);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("internal server error");
    });
});
