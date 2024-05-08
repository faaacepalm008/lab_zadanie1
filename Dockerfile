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
