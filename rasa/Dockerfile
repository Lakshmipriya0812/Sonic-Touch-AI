FROM rasa/rasa:3.6.21

WORKDIR /app

COPY ./models ./models
COPY ./config.yml ./
COPY ./domain.yml ./
COPY ./data ./data
COPY ./endpoints.yml ./

EXPOSE 5005

CMD ["run", "--enable-api", "--cors", "*", "--debug", "--port", "5005", "--endpoints", "endpoints.yml"]
