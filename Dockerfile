FROM node:jessie

EXPOSE 8000
RUN apt-get -y install curl
RUN npm install -g webpack yarn gulp gulp-sass node-sass --unsafe-perm
RUN npm install gulp gulp-sass gulp-autoprefixer gulp-csscomb gulp-combine-media-queries gulp-imagemin imagemin-pngquant imagemin-mozjpeg gulp-pug connect-ssi browser-sync gulp-plumber gulp-notify
RUN npm install -D gulp-webserver 

CMD ["/bin/bash"]
