global.__basedir = __dirname;
require('dotenv').config()
const dbConnector = require('./config/db');
const apiRouter = require('./router');
const cors = require('cors');
const { errorHandler } = require('./utils');
const cookieParser = require('cookie-parser');

dbConnector()
  .then(() => {
    const config = require('./config/config');

    const app = require('express')();
    require('./config/express')(app);

    const cors = require('cors');
  
    
    app.use(cors({
      origin: function (origin, callback) {
    
        if (config.origin.includes(origin) || !origin) { 
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true  
    }));
    
    app.use('/api', apiRouter);
    app.use(cookieParser());

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);