FROM node:20 AS builder

WORKDIR /app

COPY ./client . 

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
