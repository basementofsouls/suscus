# Используем Node.js для сборки
FROM node:18 as build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем проект
RUN npm run build

# Используем Nginx для хостинга сборки
FROM nginx:stable-alpine

# Копируем собранные файлы React в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг Nginx (если требуется)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
