FROM node:jessie
RUN npm install -g webpack yarn gulp gulp-sass node-sass --unsafe-perm
RUN npm install gulp
