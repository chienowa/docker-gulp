# docker-gulp

docker build ./ -t gulpdev
docker run --name gulpserver -it -d -v {local src directory}:/apps -w /apps gulpdev
docker exec -it gulpserver gulp

or 

docker-compose up -d

docker exec -it gulpserver gulp server

