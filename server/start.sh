#!/bin/bash

# Run the data import script (preprocess-import.js)
echo "Running data import..."
node preprocess-import.js

# Now start the server (server.js)
echo "Starting server..."
node server.js
