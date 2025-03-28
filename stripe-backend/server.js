require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const vision = require("@google-cloud/vision");

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post("/create-payment-intent", (req, res) => {
  const { amount } = req.body; // amount in cents
  const clientSecret = "client_secret_" + amount + "_" + Date.now();
  console.log(`PaymentIntent for amount: ${amount}`);
  res.json({ clientSecret });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Stripe backend server is running on port ${PORT}`);
});


const visionClient = new vision.ImageAnnotatorClient();

app.post("/analyze-image", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image data is required." });
    }

    const [result] = await visionClient.labelDetection({
      image: { content: image },
    });

    const labels = result.labelAnnotations.map((label) => ({
      description: label.description,
      score: label.score,
    }));

    res.json({ labels });
  } catch (error) {
    console.error("Vision API error:", error);
    res.status(500).json({ error: "Failed to analyze image." });
  }
});