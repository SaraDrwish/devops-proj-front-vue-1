import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const urls = new Map();

app.post("/shorten", (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "URL required" });
  }

  const shortId = Math.random().toString(36).substring(2, 8);
  urls.set(shortId, originalUrl);

  res.json({ shortUrl: `http://localhost:5000/${shortId}` });
});

app.get("/:id", (req, res) => {
  const original = urls.get(req.params.id);
  if (original) {
    res.redirect(original);
  } else {
    res.status(404).send("Link not found");
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
