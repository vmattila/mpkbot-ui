import { signInWithRedirect } from 'aws-amplify/auth';

import {
  Flex,
  Button,
  Heading,
  Text,
  Divider,
  Link,
  useTheme,
} from '@aws-amplify/ui-react';
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Welcome = () => {
  const { tokens } = useTheme();
  return (
    <Flex direction="column">

      <Heading level={1}>MPK Bot</Heading>

      <Heading level={4} fontStyle='italic' fontWeight={200}>Älä enää missaa kiinnostavaa kurssia - jätä Koulutuskalenterin vahtiminen MPK Botin huoleksi!</Heading>

      <Text lineHeight="1.5em">
        MPK Bot lähettää sinulle sähköpostitse tiedon uusista Maanpuolustuskoulutusyhdistyksen
        kursseista antamillasi hakusanoilla. Esimerkiksi jos lisäät hakusanan "ammunta", saat
        sähköpostiviestin aina, kun uusi ammuntaan liittyvä kurssi avautuu kurssikalenteriin.
      </Text>
      <Text lineHeight="1.5em">
        Palvelua ylläpidetään vapaaehtoisvoimin, ilman takuuta tai palvelulupauksia.
      </Text>

      <Flex
        direction="row"
        justifyContent="center"
      >
        <Button onClick={() => signInWithRedirect()} variation='primary'>
          Kirjaudu sisään
        </Button>
      </Flex>

      <Divider />

      <Flex
        direction="column"
      >

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Mikä juttu?</Heading>
        <Text>
          MPK:n Lounais-Suomen maanpuolustuspiirin kyberturvallisuuden peruskurssilla tuli kouluttajien ja kurssilaisten kesken puheeksi,
          että MPK:n koulutuskalenteriin ilmestyvistä kursseista on vaikea saada tietoa. MPK Bot syntyi harrasteprojektina
          yhtenä ratkaisuna tähän ongelmaan.
        </Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Onko tämä MPK:n ylläpitämä palvelu?</Heading>
        <Text>
          Ei ole. MPK Botia ylläpidetään vapaaehtoisvoimin, ilman takuuta tai palvelulupauksia.
        </Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Miksi minun täytyy kirjautua/rekisteröityä?</Heading>
        <Text>Kirjautumisella/rekisteröitymisellä varmistetaan, että sähköpostiosoitteesi on käytössä ja pystyt
          muokkaamaan tilaamiasi hakuvahteja myöhemmin.</Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Kirjaudunko MPK:n koulutuskalenterin tunnuksilla?</Heading>
        <Text>Et, vaan sinun tulee luoda MPK Bot -palveluun oma tunnus. Klikkaa ensin Kirjaudu sisään ja valitse
          kirjautumissivulta "Sign up".</Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Miksi kirjautumissivu on englanninkielinen?</Heading>
        <Text>Kirjautuminen käyttää AWS Cognito -palvelua, jossa käytettävissä on vain englanti.</Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Mitä tietoja palvelu kerää?</Heading>
        <Text>
          Rekisteröitymiseen tarvitset vain toimivan sähköpostiosoitteen sekä valitsemasi salasanan.
          Hakuvahdeista tallennetaan antamasi hakuehdot. Kun palvelu löytää hakuvahtiin sopivan kurssin, tallennetaan
          osumasta tieto hakuvahtiin jotta et saa samasta kurssista uutta ilmoitusta.
          Lisäksi palvelu kerää lokitietoja tekemistäsi toimenpiteistä. Lokeja säilytetään 7 vrk, jonka jälkeen ne tuhotaan.
        </Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Kuinka usein palvelu lähettää sähköposteja?</Heading>
        <Text>
          MPK Bot ilmoittaa uusista kursseista noin kerran tunnissa asettamiesi hakuvahtien mukaan.
        </Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Voiko samasta kurssista tulla useita sähköposteja?</Heading>
        <Text>
          Yhdestä kurssista lähetetään pääsääntöisesti vain yksi sähköpostiviesti. Tiedot lähetetyistä viesteistä poistetaan, jos poistat
          hakuvahdin. Tällöin poistetun hakuvahdin ilmoittamat kurssit ovat taas "uusia" ja joku toinen hakuvahti voi lähettää kurssista tiedon.
        </Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Mihin tiedot ovat tallennettu?</Heading>
        <Text>MPK Bot käyttää Amazon Web Services -palvelun Tukholmassa sijaitsevaa konesalia.
          <Link href="https://github.com/vmattila/mpkbot" isExternal={true}>Tutustu ympäristön teknisiin määrittelyihin GitHub-palvelussa <FaExternalLinkAlt /></Link>
        </Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Haluan lopettaa palvelun käytön, miten toimin?</Heading>
        <Text>
          Kirjaudu sisään ja klikkaa nimen viereistä valikkopainiketta ja valitse Poista käyttäjätilini lopullisesti.
          Käyttäjätietosi ja hakuvahtisi poistetaan palvelusta välittömästi. Lokitiedot poistuvat 7 vrk kuluttua.
          Voit luoda poiston jälkeen käyttäjätilin uudelleen sähköpostiosoitteella.
        </Text>

        <Heading level={3} fontWeight={tokens.fontWeights.thin}>Mistä löydän palvelun lähdekoodit?</Heading>
        <Text>
          MPK Botin lähdekoodit ovat saatavilla <FaGithub /> GitHub-palvelussa:
          <ul>
            <li><Link href="https://github.com/vmattila/mpkbot-ui" isExternal={true}>mpkbot-ui (käyttöliittymä) <FaExternalLinkAlt /></Link></li>
            <li><Link href="https://github.com/vmattila/mpkbot" isExternal={true}>mpkbot (api ja infra) <FaExternalLinkAlt /></Link></li>
          </ul>
        </Text>
      </Flex>

      <Divider />

    </Flex>
  );
};
export default Welcome;