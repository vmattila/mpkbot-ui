import { Auth } from 'aws-amplify';

import {
  Flex,
  Button,
  Heading,
  Text,
  Expander,
  ExpanderItem,
   useTheme,
} from '@aws-amplify/ui-react';

const Welcome = () => {
  const { tokens } = useTheme();
  return (
    <>

<Heading
  level={1} 
>
   MPK Bot
</Heading>

<Text
    lineHeight="1.5em"
  >
    MPK Bot on palvelu, joka lähettää sinulle sähköpostitse tiedon uusista Maanpuolustuskoulutusyhdistyksen
    kursseista antamillasi hakusanoilla. Jos lisäät palveluun esimerkiksi hakusanan "ammunta", saat
    sähköpostiviestin aina, kun uusi ammuntaan liittyvä kurssi avautuu kurssikalenteriin.
</Text>
<Text
    lineHeight="1.5em"
  >
    Palvelua ylläpidetään vapaaehtoisvoimin, ilman takuuta tai palvelutasolupausta.
</Text>

    <Flex
      direction="row"
      justifyContent="center"
    >
      <Button onClick={() => Auth.federatedSignIn()} variation='primary'>
        Kirjaudu sisään
      </Button>
      </Flex>

      <Expander type="single" isCollapsible={true}>
  <ExpanderItem title="Lisätietoja palvelusta" value="item-1">

    <Heading level={3} fontWeight={tokens.fontWeights.thin}>Miksi minun täytyy kirjautua/rekisteröityä?</Heading>
    <Text>Kirjautumisella/rekisteröitymisellä varmistetaan, että sähköpostiosoitteesi on käytössä ja pystyt
    muokkaamaan tilaamiasi hakuvahteja myöhemmin.</Text>

    <Heading level={3} fontWeight={tokens.fontWeights.thin}>Kirjaudunko MPK:n koulutuskalenterin tunnuksilla?</Heading>
    <Text>Et, vaan sinun tulee luoda MPK Bot -palveluun oma tunnus. Klikkaa ensin Kirjaudu sisään ja valitse kirjautumissivulta "Sign up".</Text>

    <Heading level={3} fontWeight={tokens.fontWeights.thin}>Miksi kirjautumissivu on englanninkielinen?</Heading>
    <Text>Kirjautuminen käyttää tunnusten hallintaan Amazon AWS Cognito -palvelua, jossa käytettävissä on vain englanninkieli.</Text>

    <Heading level={3} fontWeight={tokens.fontWeights.thin}>Mitä tietoja palvelu kerää?</Heading>
    <Text>Rekisteröitymiseen tarvitset sähköpostiosoitteen sekä valitsemasi salasanan. Kun lisäät hakuvahteja, hakuvahdeista tallennetaan haluamasi hakusanat.</Text>

    <Heading level={3} fontWeight={tokens.fontWeights.thin}>Mihin tiedot ovat tallennettu?</Heading>
    <Text>Palvelu käyttää Amazon AWS -palvelun Tukholmassa sijaitsevaa konesalia ja siellä olevia DynamoDB ja Cognito -palveluita.</Text>
  </ExpanderItem>
</Expander>
  </>
  );
};
export default Welcome;