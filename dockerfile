FROM node:22-alpine AS builder
wORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install sequelize sqlite3
COPY . .
expose 5000
CMD ["node", "server.js"]
