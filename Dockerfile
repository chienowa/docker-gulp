FROM node:jessie

EXPOSE 8000
RUN apt-get -y install curl
RUN npm install -g webpack yarn gulp gulp-sass node-sass --unsafe-perm
RUN npm install gulp gulp-sass
RUN npm install -D gulp-webserver 

CMD ["gulp webserver"]
