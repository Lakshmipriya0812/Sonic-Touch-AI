import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Create __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database and collection details
const dbName = 'sonic-touch';
const collectionName = 'products';
const mongoHost = 'localhost:27017';
const mongoURL = `mongodb://${mongoHost}`;

// Directory containing CSV files
const directoryPath = path.join(__dirname, 'mongodb-data');

async function runImport() {
  // Connect to MongoDB
  const client = new MongoClient(mongoURL);
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
  
    // Check if collection is empty
    const count = await collection.countDocuments({});
    if (count > 0) {
      console.log(`Collection "${collectionName}" already has ${count} documents. Skipping import.`);
      return;
    }
  
    console.log(`Collection "${collectionName}" is empty. Starting CSV import...`);
  
    // Read CSV files from the directory
    let files;
    try {
      files = await fs.readdir(directoryPath);
    } catch (err) {
      console.error('Error reading directory:', err);
      return;
    }
  
    // Filter to only CSV files
    const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
  
    if (csvFiles.length === 0) {
      console.log('No CSV files found in:', directoryPath);
      return;
    }
  
    // Iterate over each CSV file and run the mongoimport command
    for (const file of csvFiles) {
      const filePath = path.join(directoryPath, file);
      // Build the mongoimport command with --headerline flag
      const command = `mongoimport --host ${mongoHost} --db ${dbName} --collection ${collectionName} --type csv --file "${filePath}" --headerline --columnsHaveTypes`;
      console.log(`Importing file: ${file}`);
      try {
        const { stdout, stderr } = await execAsync(command);
        if (stdout) {
          console.log(`Output for ${file}: ${stdout}`);
        }
        if (stderr) {
          // Optionally, check if stderr indicates an actual error.
          console.log(`Log for ${file}: ${stderr}`);
        }
      } catch (error) {
        console.error(`Error importing ${file}:`, error.message);
      }
      
    }
  } catch (err) {
    console.error('Failed to complete CSV import:', err);
  } finally {
    await client.close();
  }
}

await runImport();
