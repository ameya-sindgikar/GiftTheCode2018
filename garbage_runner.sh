#!/usr/bin/env bash

nginx -g "daemon off;" &
python Backend/api.py
