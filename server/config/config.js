const env = process.env.NODE_ENV || 'development';

const config = require('./config.json');
const envConfig = config[env];

// add env config details to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
