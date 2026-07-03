const pdfParse = require("pdf-parse");
const DocumentSchema = require("../model/doument");
const ai = require("../utils/gemini");

const uploadDocument = async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }
    // Parse the PDF file using pdf-parse
    const data = await pdfParse(req.file.buffer);

     const Dodument = await DocumentSchema.create({
        fileName: req.file.originalname,
        chunkIndex: 0, // Assuming this is the first chunk
        text: data.text,
    });

    console.log(data.text);

    res.json({
        success: true,
        message: "PDF received"
    });
};
const chatWithDocument = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const document = await DocumentSchema.findOne();

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "No document found",
      });
    }
         const prompt = `
        Answer ONLY using the document below.

        Document:
        ${document.text}

        Question:
        ${question}

        If the answer is not found in the document, reply:
        "The uploaded document does not contain this information."
        `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      answer: response.text,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
    uploadDocument,
    chatWithDocument
};