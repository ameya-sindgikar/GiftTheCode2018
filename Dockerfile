FROM python:3.7-alpine

WORKDIR /web

COPY Backend/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN apk add sqlite curl

COPY Backend/ Backend/

EXPOSE 5000

ENTRYPOINT python Backend/api.py
