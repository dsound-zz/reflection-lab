import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/summarize", async (req: Request, res: Response) => {
  const { reflection } = req.body;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a kind reflection coach." },
        {
          role: "user",
          content: `Summarize this reflection kindly:\n${reflection}`,
        },
      ],
    });
    res.json({ summary: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI error" });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
