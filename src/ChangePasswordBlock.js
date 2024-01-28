import React, { useState } from "react";

import {
  Accordion,
  Flex,
  Text,
} from "@aws-amplify/ui-react";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

import withReactContent from "sweetalert2-react-content";
import { AccountSettings } from '@aws-amplify/ui-react';
const MySwal = withReactContent(Swal);

const ChangePasswordBlock = () => {
  const [value, setValue] = useState([]);
  const handleSuccess = () => {
    MySwal.fire({
      title: (
        <Text>
          Salasanasi on vaihdettu.
        </Text>
      ),
      showCancelButton: false,
      confirmButtonText: "Selvä!",
    }).then(() => {
      setValue([]);
    });
  }

  return (
    <Flex direction="column">
      <Accordion.Container value={value} onValueChange={setValue}>
        <Accordion.Item value="open">
          <Accordion.Trigger>
            <Text fontWeight={600}>Vaihda salasana</Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Flex direction="column">
              <AccountSettings.ChangePassword
                onSuccess={handleSuccess}
                displayText={{
                  currentPasswordLabel: 'Syötä nykyinen salasanasi',
                  newPasswordLabel: 'Syötä uusi salasana',
                  confirmPasswordLabel: 'Vahvista uusi salasana',
                  updatePasswordText: 'Vaihda salasana',
                }}  
              />
            </Flex>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Container>
    </Flex>
  );
};
export default ChangePasswordBlock;
