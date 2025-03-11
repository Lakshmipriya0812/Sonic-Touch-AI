const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");
const csv = require("csvtojson");
const { MongoClient } = require("mongodb");

const mongoURL = "mongodb://localhost:27018";
const dbName = "sonic-touch";
const collectionName = "products";

const dataDirectory = path.join(__dirname, "mongodb-data");

async function processCSVFile(filePath) {
  const jsonArray = await csv().fromFile(filePath);

  for (let row of jsonArray) {
    try {
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
    if (row.price) {
      row.price = parseFloat(row.price);
    }
    if (row.stock) {
      row.stock = parseInt(row.stock);
    }
  }
  return jsonArray;
}

async function importCSVFiles() {
  const client = new MongoClient(mongoURL);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const count = await collection.countDocuments({});
    if (count > 0) {
      console.log(
        `Collection "${collectionName}" already has ${count} documents. Skipping import.`
      );
      return;
    }

    const files = await fs.promises.readdir(dataDirectory);
    const csvFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".csv"
    );

    if (csvFiles.length === 0) {
      console.log(`No CSV files found in: ${dataDirectory}`);
      return;
    }

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

importCSVFiles();
