# ===========================
# 🔹 Etapa 1: Construcción (Node.js)
# ===========================
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero para optimizar caché
COPY package.json package-lock.json ./

# Instala dependencias con npm ci (más rápido y seguro que npm install)
RUN npm ci --force

# Copia el resto del código fuente
COPY . .

# Construir la aplicación React
RUN npm run build

# ===========================
# 🔹 Etapa 2: Producción (Nginx)
# ===========================
FROM nginx:1.25

# Copiar los archivos de la aplicación React al servidor de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración personalizada de Nginx si existe
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para el servidor
EXPOSE 80

# Iniciar Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
