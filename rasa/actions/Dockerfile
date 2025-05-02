FROM rasa/rasa-sdk:latest

WORKDIR /app/actions

COPY rasa/actions/entrypoint.sh /app/actions/entrypoint.sh


ENTRYPOINT ["/app/actions/entrypoint.sh"]
CMD ["python", "-m", "rasa_sdk", "--port", "5055"]
