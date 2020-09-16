FROM node:alpine
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
# docker run -it -p3001:3000 image_name
