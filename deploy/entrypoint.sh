#!/bin/sh

ENV_PREFIX="VUE_APP__"
ENV_HOLDER="//ENVIRONMENT_APP_SETTINGS_PLACEHOLDER"

ENV_VARIABLES=$(printenv | grep $ENV_PREFIX | sed "s|=|:'|" | sed "s|$|',|" | tr -d '\n')
sed -i "s|$ENV_HOLDER|$ENV_VARIABLES|" /usr/share/nginx/html/app-config.js

exec "$@"