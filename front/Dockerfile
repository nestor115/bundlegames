# Etapa de construcción
FROM node:20.12.0-alpine as build
WORKDIR /front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
 COPY nginx.conf /etc/nginx/nginx.conf
 COPY --from=build /front/build /usr/share/nginx/html
EXPOSE 80
