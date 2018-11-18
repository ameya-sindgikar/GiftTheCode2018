FROM python:3.7-alpine

WORKDIR /web

COPY Backend/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN mkdir -p /run/nginx
RUN apk add sqlite curl nginx

COPY Backend/api.py Backend/api.py
COPY Backend/GiftTheCode.db Backend/GiftTheCode.db
COPY Frontend/build/* /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf
COPY garbage_runner.sh garbage_runner.sh

EXPOSE 5000 80

ENTRYPOINT sh ./garbage_runner.sh
