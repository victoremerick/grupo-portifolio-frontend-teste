# Stage 1 - Build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - Serve
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/task-manager-web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
