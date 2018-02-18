IMAGE=bersling/animals
docker build -t $IMAGE .
docker push $IMAGE
