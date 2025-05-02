FROM rasa/rasa:latest

WORKDIR /app

COPY . /app

# Optional: Train model during build (or do it locally)
# RUN rasa train

EXPOSE 5005

CMD ["run", "--enable-api", "--cors", "*", "--debug", "--port", "5005", "--endpoints", "endpoints.yml"]
