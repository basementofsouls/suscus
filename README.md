# suscus

# suscus

#
docker-compose -p suscus up --build -d

# После запуска в контейнере сервера

docker exec -it server sh
npx prisma generate
npx prisma migrate deploy


#
docker exec -it postgres bash
psql -U user -d mydb

INSERT INTO users (username, email, password, role)
VALUES 
  ('suscus', 'suscus@suscus.com', '$2b$10$ZlIlqvTqn9wBxOXi2NBtHe7oDdeHHL11qgtBIVH0qEuKb/jT0gwMi', 'manager');
