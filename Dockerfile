FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
# Railway ignora EXPOSE, pero es buena práctica dejarlo 
# o mejor aún, no hardcodear el 9999.
EXPOSE 3000


CMD ["npm", "start"]