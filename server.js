import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // public フォルダを公開

app.post("/api/shiritori", async (req, res) => {
    const userWord = req.body.word;

    const prompt = `
あなたはしりとりAIです。
ルール:
- 最後の文字から始まる単語を返す
- 名詞のみ
- 「ん」で終わる単語は負け
- 返答は単語のみ

ユーザーの単語: ${userWord}
AIの返答:
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    const aiWord = data.choices[0].message.content.trim();

    res.json({ ai_word: aiWord });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});