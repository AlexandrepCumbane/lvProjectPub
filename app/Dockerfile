FROM node:10.15.3

WORKDIR /app

ENV PATH ./node_modules/.bin:$PATH

COPY package*.json ./

RUN yarn

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]