# build environment
FROM node:14.13-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ../src/package.json /app/package.json
RUN npm install --silent
RUN npm install @vue/cli@4.5.6 -g
COPY ../src /app
RUN npm run build

# production environment
FROM nginx:1.19.3-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./deploy/nginx.conf /etc/nginx/conf.d

COPY ./deploy/entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]