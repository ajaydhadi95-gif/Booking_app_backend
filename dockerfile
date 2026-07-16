FROM node:22-alpine AS builder
wORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
expose 5000
CMD ["node", "server.js"]
