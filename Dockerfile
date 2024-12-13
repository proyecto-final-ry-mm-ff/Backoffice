# Etapa 1: Construcción
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor de Nginx para producción
FROM nginx:1.25
# Copiar los archivos de la aplicación React al servidor de Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Exponer el puerto 80 para el servidor
EXPOSE 80
# Iniciar Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
