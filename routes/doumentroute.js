const express = require("express");
const upload = require("../middleware/upload");
const documentrouter = express.Router();
const { uploadDocument, chatWithDocument } = require("../controller/documentcontroller");

documentrouter.post('/upload',upload.single('file'),uploadDocument)

documentrouter.post('/chat',chatWithDocument)

module.exports = documentrouter;