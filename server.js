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

// Określ port, na którym serwer będzie nasłuchiwał
const port = process.env.PORT || 3000;

// Uruchom serwer i nasłuchuj na określonym porcie
server.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});
