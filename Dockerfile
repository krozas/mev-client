#etapa de compilacion
ARG NODE_VERSION=23.11.0
FROM node:${NODE_VERSION}-alpine AS builder

# Declaro las variables
ENV DIR=/app

# Creo el directorio en el contenedor
WORKDIR ${DIR}
# Copy package.json and package-lock.json to the working directory 
COPY package*.json ./

# Install dependencies 
RUN npm install 


# Copiar el resto del proyecto y construirlo
COPY . . 
RUN npm run build


# etapa de producción
FROM nginx:1.17.10-alpine AS production
 
COPY --from=builder /app/dist /usr/share/nginx/html  
 

# Expose the port that the application listens on.
EXPOSE 9001

# Run the application.
CMD ["nginx", "-g", "daemon off;"]
 

