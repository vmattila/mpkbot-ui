import CourseFinder from "./CourseFinder";
import { signOut } from "aws-amplify/auth";

import { Button, Flex, Text, Menu, MenuItem } from "@aws-amplify/ui-react";
import { FaDoorClosed } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { getCurrentUserEmail, getAuthHeaderForApiCall } from "./authHelper";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import withReactContent from "sweetalert2-react-content";
import ChangePasswordBlock from "./ChangePasswordBlock";

const MySwal = withReactContent(Swal);

const Home = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function eml() {
      setEmail(await getCurrentUserEmail());
    }
    eml();
  }, []);

  const handleDeleteUser = async (event) => {
    MySwal.fire({
      title: (
        <Text>
          Oletko varma, että haluat poistaa käyttäjätilisi lopullisesti?
        </Text>
      ),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Kyllä, poista",
      denyButtonText: "Ei, älä poista",
    }).then(async (resp) => {
      if (resp.isConfirmed) {
        fetch(`${process.env.REACT_APP_API_URL_BASE}/me`, {
          method: "DELETE",
          headers: { Authorization: await getAuthHeaderForApiCall() },
        })
          .then((res) => res.json())
          .then((result) => {
            signOut();
          });
      }
    });
    event.preventDefault();
  };

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
        <Text>
          Kirjautuneena: <Text fontWeight={600}>{email}</Text>
        </Text>
        <Menu menuAlign="start">
          <MenuItem onClick={handleDeleteUser}>
            Poista käyttäjätilini lopullisesti
          </MenuItem>
        </Menu>

        <Button
          variation="default"
          onClick={() => signOut()}
          ariaLabel="Kirjaudu ulos"
        >
          <FaDoorClosed /> <Text as="span">Kirjaudu ulos</Text>
        </Button>
      </Flex>

      <CourseFinder />

      <ChangePasswordBlock />
    </Flex>
  );
};
export default Home;
