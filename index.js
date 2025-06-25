import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongo, client } from "./monjo.js"; // import client too

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
await connectToMongo();

// Choose database and collection
const db = client.db("bookDB"); // You can name this whatever you want
const bookCollection = db.collection("books");

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Book Server API!");
});

// Upload book data
app.post("/upload", async (req, res) => {
  try {
    const data = req.body;
    const result = await bookCollection.insertOne(data);
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to insert book", details: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = bookCollection.find();

    const result = await books.toArray();
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to get  books ", details: err.message });
  }
});



app.patch("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBook = req.body;

    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        ...updatedBook,
      },
    };

    const result = await bookCollection.updateOne(filter, updateDoc, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating the book", error });
  }
});


app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollection.deleteOne(filter);

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.send({ message: "Book deleted successfully", result });
  } catch (error) {
    res.status(500).send({ message: "Error deleting book", error });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
