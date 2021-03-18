# stage-1: build dist folder
FROM node:14.16.0-alpine as build
ARG ENV=''
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "/usr/src/app/"]
RUN npm config set registry http://192.168.4.59:8081/repository/npm-all-jszx/
RUN npm install --silent
COPY . .
RUN npm run build:${ENV}

# stage-2: copy static files to nginx image
FROM nginx:alpine
ARG ENV=''
EXPOSE 80
COPY nginx/gzip.conf /etc/nginx/conf.d/gzip.conf
COPY nginx/default-${ENV}.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
