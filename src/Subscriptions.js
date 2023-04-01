import React from 'react';
import { Button } from '@aws-amplify/ui-react';

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';

const Subscriptions = (props) => {
  
  return (
    <>
      <Table>
    <TableHead>
      <TableRow>
        <TableCell as="th">Hakusana</TableCell>
        <TableCell as="th">Ei-hakusana</TableCell>
        <TableCell as="th"></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {props.subscriptions.map((value, index) => {
          return <TableRow key="{value.id}">
          <TableCell>{value.keywords}</TableCell>
          <TableCell>{value.not_keywords}</TableCell>
          <TableCell>
            <Button onClick={() => props.onDropSubscription(value.id)}>Poista</Button>
          </TableCell>
        </TableRow>
        })}
      
    </TableBody>
  </Table>
    </>
  );
};
export default Subscriptions;