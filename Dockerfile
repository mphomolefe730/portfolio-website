FROM node:18.17.1-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Use Nginx to serve the built Angular app
FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY ngnix.config /etc/nginx/conf.d/nginx.conf

COPY /usr/share/nginx/html/src/assets/icons/menu-burger-horizontal-svgrepo-com.svg

COPY --from=builder /app/dist /usr/share/nginx/html

COPY src/* /usr/share/nginx/html/src

EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
