FROM python:3.7-alpine

WORKDIR /web

COPY Backend/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN apk add sqlite curl nginx

COPY Backend/api.py Backend/api.py
COPY Backend/GiftTheCode.db Backend/GiftTheCode.db
COPY Frontend/build/* /var/www/html/

EXPOSE 5000 80

ENTRYPOINT python Backend/api.py
