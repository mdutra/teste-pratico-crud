FROM node:14

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

# Download wait-for-it.sh
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it.sh
# Make wait-for-it.sh executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]
