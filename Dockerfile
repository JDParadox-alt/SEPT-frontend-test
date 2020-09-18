# FROM node:alpine
# WORKDIR /frontend
# COPY package.json .
# RUN npm install
# COPY . .
# ENV PORT=3000
# EXPOSE 3000
# CMD ["npm", "start"]
# # docker run -it -p3001:3000 image_name

# Use below nginx version
FROM nginx:1.15.2-alpine
# Copy the build folder of the react app
COPY ./build /var/www
# Copy the ngnix configrations
COPY deployments/nginx.conf /etc/nginx/nginx.conf
# Expose it on port 80
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]