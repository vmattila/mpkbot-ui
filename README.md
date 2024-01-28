# MPK Bot -käyttöliittymä (React)

Tämä repository pitää sisällään MPK Bot -palvelun käyttöliittymän lähdekoodit (React). Löydät palvelun osoitteesta
https://beta.mpkbot.fi/

Palvelun API:n ja infran lähdekoodit löytyvät erillisestä repositorystä: https://github.com/vmattila/mpkbot

## Environment variables

Aseta seuraavat ympäristömuuttujat ennen `npm start` tai `npm run build` -komentojen ajamista.

 * `REACT_APP_USER_POOL_ID` Cognito User Pool, jota vasten autentikointi tehdään
 * `REACT_APP_USER_WEB_CLIENT_ID` UI Clientin ID (Cognito User Pool)
 * `REACT_APP_COGNITO_DOMAIN` Cognito self hosted UI -osoite ilman https:// -alkua
 * `REACT_APP_API_URL_BASE` MPK Bot API -osoite (lähdekoodit ks. https://github.com/vmattila/mpkbot)
 * `REACT_APP_COGNITO_REDIRECT_URL` Osoite, johon käyttäjä ohjataan kirjautumisen jälkeen