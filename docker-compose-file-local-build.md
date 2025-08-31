## 3. Deployment Options

### **Option 2: Local build (development / testing)**

Update your `docker-compose.yml` to build images locally:

```yaml
services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "8080:80"

  server:
    build: ./server
    ports:
      - "5000:5000"
    volumes:
      - ./server/mongodb-data:/app/mongodb-data
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
      - PORT=${PORT}

  rasa:
    build: ./rasa
    ports:
      - "5005:5005"
    volumes:
      - ./rasa/models:/app/models

  actions:
    build:
      context: ./rasa/actions
      dockerfile: Dockerfile
    ports:
      - "5055:5055"

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Run locally:

```bash
docker-compose down
docker-compose up --build
```

> Frontend will be available at [http://localhost:8080](http://localhost:8080)

---
