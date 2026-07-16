FROM node:22-alpine AS builder
wORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
expose 5000
CMD ["node", "server.js"]
