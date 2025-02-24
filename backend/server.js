const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const fileTreeRoutes = require('./routes/fileTreeRoutes');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: ["https://google-drive-clone-client.vercel.app/"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
  }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/fileTree', fileTreeRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});
