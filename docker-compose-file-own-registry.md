## 3. Deployment Options

### **Option 1: Use your own Docker registry**

1. Build the images locally:

```bash
docker build -t <your_dockerhub_username>/sonic-touch-client:latest ./client
docker build -t <your_dockerhub_username>/sonic-touch-server:latest ./server
docker build -t <your_dockerhub_username>/sonic-touch-rasa:latest ./rasa
docker build -t <your_dockerhub_username>/sonic-touch-actions:latest ./rasa/actions
```

2. Push to your private Docker registry:

```bash
docker push <your_dockerhub_username>/sonic-touch-client:latest
docker push <your_dockerhub_username>/sonic-touch-server:latest
docker push <your_dockerhub_username>/sonic-touch-rasa:latest
docker push <your_dockerhub_username>/sonic-touch-actions:latest
```

3. Update your `docker-compose.yml` to use the registry images:

```yaml
services:
  client:
    image: <your_dockerhub_username>/sonic-touch-client:latest
    ports:
      - "8080:80"

  server:
    image: <your_dockerhub_username>/sonic-touch-server:latest
    ports:
      - "5000:5000"

  rasa:
    image: <your_dockerhub_username>/sonic-touch-rasa:latest
    ports:
      - "5005:5005"

  actions:
    image: <your_dockerhub_username>/sonic-touch-actions:latest
    ports:
      - "5055:5055"

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
```

4. Run the application:

```bash
docker-compose down
docker-compose pull
docker-compose up
```

> This option is ideal for production or machines with limited disk space.

---
