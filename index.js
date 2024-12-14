const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');


const app = express();
const PORT = 5555;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// File paths
const USERS_FILE = './users.json';
const FEEDBACK_FILE = './feedback.json';

// Utility function to load data
const loadData = (file) => {
    if (!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
};

// Utility function to save data
const saveData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Load initial data
const users = loadData(USERS_FILE);
const feedback = loadData(FEEDBACK_FILE);

// Sign-Up Route
app.post('/user/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Missing fields.');

    const userExists = users.some((user) => user.username === username);
    if (userExists) return res.status(409).send('Username already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: users.length + 1, username, password: hashedPassword });
    saveData(USERS_FILE, users);
    res.status(201).send('User signed up successfully.');
});

// Login Route
app.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(401).send('Invalid credentials.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials.');

    const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });
    res.status(200).send('Login successful.');
});

// Feedback Route
app.post('/feedback', (req, res) => {
    const { rating, comments } = req.body;
    if (!rating || !comments) return res.status(400).send('Missing fields.');

    feedback.push({ id: feedback.length + 1, rating, comments });
    saveData(FEEDBACK_FILE, feedback);
    res.status(201).send('Feedback submitted successfully.');
});

// Protected Route
app.get('/protected', (req, res) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('Access denied. Please log in.');

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(403).send('Invalid token.');
        res.status(200).json({ message: 'Access granted!', user: decoded });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});