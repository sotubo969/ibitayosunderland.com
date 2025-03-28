const http = require('http');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const querystring = require('querystring');
 
const dbPath = path.join(__dirname, 'users.sqlite');
const db = new sqlite3.Database(dbPath);
 
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});
 
const registrationForm = `
<!DOCTYPE html>
<html>
<head>
<title>Register</title>
</head>
<body>
<h1>Register</h1>
<div id="message"></div>
<form method="POST" action="/register">
<div class="form-group">
<label for="username">Username:</label>
<input type="text" id="username" name="username" required>
</div>
<div class="form-group">
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
</div>
<div class="form-group">
<label for="password">Password:</label>
<input type="password" id="password" name="password" required>
</div>
<button type="submit">Register</button>
</form>
</body>
</html>
`;
 
const successPage = `
<!DOCTYPE html>
<html>
<head>
<title>Registration Successful</title>
<style>
    body { font-family: Arial, sans-serif; max-width: 500px; margin: 20px auto; padding: 20px; }
    h1 { color: #333; }
    .success { color: green; }
</style>
</head>
<body>
<h1>Registration Successful!</h1>
<p class="success">Your account has been created successfully.</p>
<p><a href="/">Back to registration</a></p>
</body>
</html>
`;
 
// Hash password with a random salt
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}
 
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(registrationForm);
  }
 
 
  else if (req.url === '/register' && req.method === 'POST') {
    let body = '';
 
    req.on('data', chunk => {
      body += chunk.toString();
    });
 
    req.on('end', () => {
      const formData = querystring.parse(body);
      const { username, email, password } = formData;
 
    
      if (!username || !email || !password) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('All fields are required');
      }
 

      const hashedPassword = hashPassword(password);
 
  
      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
      [username, email, hashedPassword], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Username already exists');
          }
 
          console.error('Database error:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Server error occurred');
        }
 
      
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(successPage);
      });
    });
  }
 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});