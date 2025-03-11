// preprocess-import.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csvtojson";
import { MongoClient } from "mongodb";

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB configuration
const mongoURL = "mongodb://localhost:27018";
const dbName = "sonic-touch";
const collectionName = "products";

// Directory containing CSV files
const dataDirectory = path.join(__dirname, "mongodb-data");

/**
 * Process a CSV file and return an array of JSON objects.
 * This function converts the 'size' and 'color' fields from strings to arrays.
 */
async function processCSVFile(filePath) {
  const jsonArray = await csv().fromFile(filePath);

  // Iterate over each row and convert specific fields
  for (let row of jsonArray) {
    // Convert fields that should be arrays. Wrap in try/catch to handle errors.
    try {
      // If the field is a string that looks like a JSON array, parse it
      if (row.size) {
        row.size = JSON.parse(row.size);
      }
    } catch (err) {
      console.error(
        `Error parsing 'size' for row: ${JSON.stringify(row)}\n`,
        err
      );
    }
    try {
      if (row.color) {
        row.color = JSON.parse(row.color);
      }
    } catch (err) {
      console.error(
        `Error parsing 'color' for row: ${JSON.stringify(row)}\n`,
        err
      );
    }

    // Optionally convert numeric fields if necessary
    if (row.price) {
      row.price = parseFloat(row.price);
    }
    if (row.stock) {
      row.stock = parseInt(row.stock);
    }
  }
  return jsonArray;
}

/**
 * Main function that processes all CSV files and imports them into MongoDB.
 */
async function importCSVFiles() {
  const client = new MongoClient(mongoURL);
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if the collection is empty before importing
    const count = await collection.countDocuments({});
    if (count > 0) {
      console.log(
        `Collection "${collectionName}" already has ${count} documents. Skipping import.`
      );
      return;
    }

    // Read CSV files from the directory
    const files = await fs.promises.readdir(dataDirectory);
    const csvFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".csv"
    );

    if (csvFiles.length === 0) {
      console.log(`No CSV files found in: ${dataDirectory}`);
      return;
    }

    // Process each CSV file and insert its data into MongoDB
    for (const file of csvFiles) {
      const filePath = path.join(dataDirectory, file);
      console.log(`Processing file: ${file}`);
      try {
        const jsonData = await processCSVFile(filePath);
        const result = await collection.insertMany(jsonData);
        console.log(`Inserted ${result.insertedCount} documents from ${file}`);
      } catch (error) {
        console.error(`Error importing ${file}:`, error.message);
      }
    }
  } catch (err) {
    console.error("Error during CSV import:", err);
  } finally {
    await client.close();
  }
}

// Run the import process
importCSVFiles();
