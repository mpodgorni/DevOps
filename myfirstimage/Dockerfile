# 1. Wybieramy obraz bazowy
FROM alpine:latest 

# 2. Instalujemy w nim zależności (dependences) niezbędne do uruchomienia "procesu głównego"
RUN apk add --update redis 
RUN apk add --update nginx 

# 3. Ustawienie "procesu głównego"
CMD redis-server