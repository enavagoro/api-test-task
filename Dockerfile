# Imagen base
FROM node:latest

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json e instalar las dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Instalar el cliente de MongoDB
RUN apt-get update && apt-get install -y mongodb-clients

# Establecer el comando de inicio
CMD ["npm", "start"]

# Exponer el puerto 5100
EXPOSE 5100

# Esperar a que MongoDB se inicie y luego ejecutar el comando para iniciar la aplicación
CMD ["sh", "-c", "until mongo --host localhost:27017 --eval 'quit()' &> /dev/null; do sleep 1; done && npm start"]