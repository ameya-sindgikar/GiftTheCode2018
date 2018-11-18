FROM python:3.7-alpine

WORKDIR /web

COPY Backend/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN mkdir -p /run/nginx
RUN apk add sqlite curl

COPY Backend/api.py Backend/api.py
COPY Backend/GiftTheCode.db Backend/GiftTheCode.db
COPY Frontend/build/ /var/www/html/
COPY garbage_runner.sh garbage_runner.sh

EXPOSE 5000 80

CMD sh ./garbage_runner.sh
