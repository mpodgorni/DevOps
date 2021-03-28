1. docker run --rm --name=myredis --network=mymulticont redis:alpine 
2. docker run --rm -v /Users/michalpodgorni/Docker/postgresdata:/var/lib/postgresql/data --name=mypostgres --network=mymulticont -e POSTGRES_PASSWORD=1qaz2wsx postgres:alpine 
3. *a) docker ps; docker kill {id};
3. b) docker build . -t devipod/webapp 
4. docker run --rm -p 9090:9090 --network=mymulticont devipod/webapp  