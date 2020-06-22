require('dotenv').config(); // Import our .env

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const middleware = require('./middleware/middleware');
const tokenMiddleware = require('./middleware/token');
const auth = require('./routes/auth');
const spotifyApi = require('./routes/spotify');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(middleware.ensureHttps);
}

// Middleware
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(auth);
const token = tokenMiddleware(app);
app.use(token);
app.use(spotifyApi);

app.use(express.static(path.join(__dirname, './dist')));

// Fallback to UI for invalid route
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🔥 Server is listening on PORT:${PORT}`);
});
