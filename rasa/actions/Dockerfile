FROM rasa/rasa-sdk:3.6.2

WORKDIR /app/actions

COPY ./rasa/actions /app/actions

COPY --chmod=+x rasa/actions/entrypoint.sh /app/actions/entrypoint.sh

EXPOSE 5055

CMD ["./entrypoint.sh"]