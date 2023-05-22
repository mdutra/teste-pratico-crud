FROM node:14

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

# Lightweight web server to serve the static files
FROM nginx:alpine
# Copy the built app to the NGINX static file directory
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
