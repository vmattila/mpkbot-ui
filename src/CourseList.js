import React from 'react';

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Link,
  Card,
} from '@aws-amplify/ui-react';

const CourseList = (props) => {
  return (
    <Card
      borderRadius="medium"
      variation="elevated"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell as="th">Kurssi</TableCell>
            <TableCell as="th">Ajankohta</TableCell>
            <TableCell as="th">Paikka</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.items.map((value, index) => {
              return <TableRow key={value.id}>
              <TableCell>
              <Link
              target="_blank"
 href={value.link}
 color="#007EB9"
>
{value.name}
</Link>
                </TableCell>
              <TableCell>{value.timeinfo}</TableCell>
              <TableCell>{value.location}</TableCell>
            </TableRow>
            })}
        </TableBody>
      </Table>
      </Card>
  );
};
export default CourseList;