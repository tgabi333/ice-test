#!/usr/bin/env bash

openssl dhparam -out /workspace/cert/dhparam.pem 2048

openssl req -x509 -newkey rsa:4086 \
  -subj "/C=XX/ST=XXXX/L=XXXX/O=XXXX/CN=localhost" \
  -keyout "/workspace/cert/key.pem" \
  -out "/workspace/cert/cert.pem" \
  -days 3650 -nodes -sha256

