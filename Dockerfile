# 1) Сборка фронта
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Если используете pnpm или yarn — установите их и замените команды ниже
RUN npm ci
COPY . .
# Если у вас Vite/React/Next static export — оставьте build
RUN npm run build

# 2) Лёгкий nginx, который отдаёт статику
FROM nginx:1.27-alpine
# Для корректного кеширования и SPA-роутинга используем свой конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Кладём собранные файлы в стандартный web-root
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx слушает 80 порт
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
