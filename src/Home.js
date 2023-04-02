import CourseFinder from './CourseFinder';
import { Auth } from 'aws-amplify';
import { Button, Flex, Text, Menu, MenuItem } from '@aws-amplify/ui-react';
import { FaDoorClosed } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Home = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(user.signInUserSession.idToken.payload.email);
  }, [user]);

  const handleDeleteUser = (event) => {
    MySwal.fire({
      title: <Text>Oletko varma, että haluat poistaa käyttäjätilisi lopullisesti?</Text>,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Kyllä, poista',
      denyButtonText: 'Ei, älä poista',
    }).then((resp) => {
      if (resp.isConfirmed) {
    fetch(`${process.env.REACT_APP_API_URL_BASE}/me`,{
      method: "DELETE",
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`},
    })
      .then(res => res.json())
      .then(
        (result) => {
          Auth.signOut()
        }
      )
      }
    });
    event.preventDefault();
  }

  return (
    <Flex direction="column">
      <Flex
        direction="row"
        justifyContent="flex-end"
        alignItems="stretch"
        alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
      >
        <Text>Kirjautuneena: <Text fontWeight={600}>{email}</Text></Text>
        <Menu
          menuAlign="start"
        >
          <MenuItem onClick={handleDeleteUser}>
            Poista käyttäjätilini lopullisesti
          </MenuItem>
        </Menu>

        <Button
          variation="default"
          onClick={() => Auth.signOut()}
          ariaLabel="Kirjaudu ulos"
        >
          <FaDoorClosed /> <Text as="span">Kirjaudu ulos</Text>
        </Button>
      </Flex>

      <CourseFinder />
    </Flex>
  );
};
export default Home;