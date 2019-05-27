# docker-gulp

docker build ./ -t gulpdev
docker run --name gulpcont -it -d -v {local src directory}:/apps -w /apps gulpdev
docker exec -it gulpcont gulp

