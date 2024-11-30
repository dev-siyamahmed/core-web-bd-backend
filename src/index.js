
import mongoose from 'mongoose';
import config from './app/config/index.js';
import app from './app.js';

async function main() {
  try {
    await mongoose.connect(config.database_url);
    console.log('Database connected successfully');
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Error connecting to database:', err);
  }
}

main().catch(err => console.error('Main function error:', err));
