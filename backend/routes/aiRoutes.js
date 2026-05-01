const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini API key
const genAI = new GoogleGenerativeAI("");

// POST /api/ai/design
router.post("/ai/design", async (req, res) => {

    try {

        const { role, company } = req.body;

        if (!role || !company) {
            return res.status(400).json({ error: "Role and company required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
Suggest a professional business card design for:

Role: ${role}
Company: ${company}

Include:
- Color palette
- Font style
- Layout structure
- QR code placement
- Overall theme
`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.json({ suggestion: text });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI generation failed" });
    }

});

module.exports = router;
