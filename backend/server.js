// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/authdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  console.log("➡️ Received login:", username);

  try {
    let user = await User.findOne({ username });

    if (!user) {
      console.log("🆕 User not found. Creating...");
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ username, password: hash });
      console.log("✅ User created:", user.username);
    } else {
      console.log("🔐 User exists:", user.username);
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        console.log("❌ Invalid password");
        return res.status(401).send("Invalid password");
      }
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey');
    console.log("✅ Token issued");
    res.json({ token });

  } catch (err) {
    console.error("❗ Error in /auth:", err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("🚀 Backend listening on http://localhost:5000"));
