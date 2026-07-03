const pdfParse = require("pdf-parse");
const DocumentSchema = require("../model/doument");
const ai = require("../utils/gemini");

// Upload Document
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const data = await pdfParse(req.file.buffer);

    // Remove old document with same file name
    await DocumentSchema.deleteMany({
      fileName: req.file.originalname,
    });

    const document = await DocumentSchema.create({
      fileName: req.file.originalname,
      chunkIndex: 0,
      text: data.text,
    });

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Chat with Document
const chatWithDocument = async (req, res) => {
  try {
    const { question, fileName } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const document = await DocumentSchema.findOne({ fileName });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

   const prompt = `
Document:

${document.text}

Question:
${question}

Answer using only the document.
`;


    console.log("REQ BODY:", req.body);
    console.log("FILE:", document.fileName);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log("GEMINI RESPONSE:", response.text);
    console.log(document.text.substring(0, 500));

    res.status(200).json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  chatWithDocument,
};