Sprawozdanie z pliku: Zadanie1
Wykonał:Viacheslav Peleshok, grupa 6.8
1)Program serwera(Javascript)
const http = require('http');
const os = require('os');
const url = require('url');
const moment = require('moment-timezone'); // Wymagana instalacja moment-timezone


// Dane autora serwera
const authorName = 'Viacheslav Peleshok'; // Imię Nazwisko


// Pobierz aktualną datę i godzinę uruchomienia serwera
const serverStartTime = new Date();


// Utwórz serwer HTTP
const server = http.createServer((req, res) => {
   // Pobierz adres IP klienta
   const clientIP = req.connection.remoteAddress;


   // Loguj informacje o uruchomieniu serwera
   console.log(`Serwer uruchomiony przez: ${authorName}`);
   console.log(`Data uruchomienia: ${serverStartTime}`);
   console.log(`Serwer nasłuchuje na porcie: ${server.address().port}`);


   // Pobierz datę i czas w strefie czasowej klienta
   const clientDateTime = moment().tz('Europe/Warsaw').format('YYYY-MM-DD HH:mm:ss');


   // Przygotuj treść odpowiedzi dla klienta
   const responseContent = `
       <html>
       <head><title>Informacje o kliencie</title></head>
       <body>
           <h1>Adres IP klienta: ${clientIP}</h1>
           <h2>Data i godzina w strefie czasowej klienta: ${clientDateTime}</h2>
           <h3> Autor: ${authorName}</h3>
       </body>
       </html>
   `;


   // Ustaw nagłówki odpowiedzi
   res.writeHead(200, {'Content-Type': 'text/html'});


   // Wyślij odpowiedź do klienta
   res.end(responseContent);
});


// Określamy port, na którym serwer będzie nasłuchiwał
const port = process.env.PORT || 3000;


// Uruchom serwer i nasłuchuj na określonym porcie
server.listen(port, () => {
   console.log(`Serwer nasłuchuje na porcie ${port}`);
});


2) Wymagany Dockerfile do zbudowania obrazu
# Etap 1: Budowanie aplikacji
FROM node:14 as builder


# Ustawienie katalogu roboczego
WORKDIR /app


# Skopiowanie plików aplikacji
COPY package.json package-lock.json ./


# Instalacja zależności
RUN npm install


# Utworzenie katalogu build (jeśli nie istnieje)
RUN mkdir -p /app/build


# Skopiowanie kodu aplikacji
COPY . .


# Budowanie aplikacji
RUN npm run build


# Etap 2: Uruchomienie aplikacji
FROM node:14-alpine


# Ustawienie katalogu roboczego
WORKDIR /app


# Skopiowanie plików z etapu budowania
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./server.js


# Skopiowanie plików package.json i package-lock.json
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json


# Instalacja tylko produkcji zależności
RUN npm install --only=production


# Ustawienie metadanych autora
LABEL author="Viacheslav Peleshok"


# Wystawienie portu
EXPOSE 5000


# Uruchomienie aplikacji
CMD ["node", "server.js"]  # Uruchamiamy tutaj server.js


3) Polecenia do:
a)zbudowania opracowanego obrazu kontenera:
docker build -t viacheslav1:v1 .
b)uruchomienia kontenera na podstawie zbudowanego obrazu:
docker run -dt -p 3000:3000 viacheslav1:v1
c)Sposobu uzyskania informacji, co generuje serwer przy odpalniu:
docker logs 8fc //8fc to 3 pierwsze znaki nazwy kontenera(info z docker ps,na screenie widać)

4)A tym polecenien dowiemy sięm ile warst posiada obraz:
docker history viacheslav:v1

