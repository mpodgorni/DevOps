-- Backend
docker build ./mybackend -t devipod/mybackend
docker push devipod/mybackend
-- Frontend
docker build ./myfrontend -t devipod/myfrontend
docker push devipod/myfrontend