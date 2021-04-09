FROM nginx:alpine

COPY ./dist/charts-test/. /usr/share/nginx/html
