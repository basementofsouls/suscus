# Stage 1: Use Node.js image for building and running the server
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код сервера
COPY . .

# Генерация Prisma Client
RUN npx prisma 

RUN npx prisma generate

# Открываем порт, на котором будет работать сервер
EXPOSE 3001

# Команда для запуска сервера
CMD ["npm", "start"]
