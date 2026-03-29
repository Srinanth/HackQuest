import { GoogleGenAI, Type } from '@google/genai';

// Initialize the SDK

export const generateQuiz = async (req, res) => {

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const { subject, topics, difficulty, numQuestions } = req.body;

  if (!subject) {
    return res.status(400).json({ error: "Subject is required" });
  }

  const count = Number(numQuestions) || 5;

  try {
    const prompt = `
Generate EXACTLY ${count} multiple-choice questions.

Rules:
- Each question MUST have exactly 4 options labeled A, B, C, D
- Provide correctOptionId as one of: A, B, C, D
- Do NOT include explanations
- Output ONLY valid JSON matching the schema (no extra text)

Subject: ${subject}
Topics: ${topics || 'General core concepts'}
Difficulty: ${difficulty || 'Medium'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // unchanged as requested
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING }
                      },
                      required: ["id", "text"] // ✅ FIXED
                    }
                  },
                  correctOptionId: { type: Type.STRING }
                },
                required: ["id", "question", "options", "correctOptionId"]
              }
            }
          },
          required: ["subject", "questions"]
        }
      }
    });

    // ✅ SAFE TEXT EXTRACTION
    let rawText =
      response?.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("Empty Gemini response:", response);
      return res.status(500).json({ error: "Empty response from AI" });
    }

    // ✅ CLEAN POSSIBLE EXTRA TEXT (failsafe)
    rawText = rawText.trim();

    // Sometimes model wraps JSON in ```json ... ```
    if (rawText.startsWith("```")) {
      rawText = rawText.replace(/```json|```/g, "").trim();
    }

    // ✅ SAFE JSON PARSE
    let quizData;
    try {
      quizData = JSON.parse(rawText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw AI Response:", rawText);
      return res.status(500).json({ error: "Invalid JSON from AI" });
    }

    // ✅ BASIC VALIDATION (extra safety)
    if (!quizData.questions || !Array.isArray(quizData.questions)) {
      return res.status(500).json({ error: "Malformed quiz data" });
    }

    res.status(200).json(quizData);

  } catch (error) {
    console.error("Gemini Quiz Generation Error:", error);
    res.status(500).json({ error: "Failed to generate quiz. Please try again." });
  }
};