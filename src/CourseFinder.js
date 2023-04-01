import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useState, useEffect, useCallback } from 'react';

import { Alert, Button, TextField } from '@aws-amplify/ui-react';
import Subscriptions from './Subscriptions';

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';

const CourseFinder = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [errorState, setError] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [notKeywords, setNotKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  
  const handleKeywordChange = (event) => {
    setKeywords(event.target.value);
  }
  const handleNotKeywordChange = (event) => {
    setNotKeywords(event.target.value);
  }

  const handleSubmit = (event) => {
    setIsLoading(true);
    setItems([]);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/courses?`
      + new URLSearchParams({
        keywords: keywords,
        not_keywords: notKeywords,
    }),{
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`}
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setItems(result.courses);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
    event.preventDefault();
  }
  const handleAddSubscription = (event) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/subscriptions`,{
      method: "POST",
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`},
      body: JSON.stringify({
        keywords: keywords,
        not_keywords: notKeywords ? notKeywords : null,
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          refreshSubscriptions();
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
    event.preventDefault();
  }
  const handleDropSubscription = (subscriptionId) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/subscriptions/${subscriptionId}`,{
      method: "DELETE",
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`}
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          refreshSubscriptions();
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }

  const [subscriptions, setSubscriptions] = useState([]);

  const refreshSubscriptions = useCallback(() => {
    setIsLoading(true);
    setSubscriptions([]);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/subscriptions`,{
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`}
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setSubscriptions(result.subscriptions);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }, [user.signInUserSession.idToken.jwtToken]);

  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  return (
    <>

      {errorState ?? <Alert variation="error">{errorState}</Alert> }

      <Subscriptions
        subscriptions={subscriptions}
        onDropSubscription={handleDropSubscription}
      />

      <form onSubmit={handleSubmit}>
        <TextField label="Avainsanat" isRequired={true} onChange={handleKeywordChange} />
        <TextField label="Avainsanat, joita ei saa olla" onChange={handleNotKeywordChange} />
        <Button
          variation="primary"
          loadingText="Etsitään..."
          ariaLabel=""
          isLoading={!!isLoading}
          type="submit"
        >
          Esikatsele kursseja
        </Button>
        <Button
          variation="default"
          loadingText="Etsitään..."
          onClick={handleAddSubscription}
          ariaLabel=""
          isLoading={!!isLoading}
        >
          Ilmoita minulle uusista kursseista
        </Button>
      </form>

      <Table
  >
    <TableHead>
      <TableRow>
        <TableCell as="th">Kurssi</TableCell>
        <TableCell as="th">Ajankohta</TableCell>
        <TableCell as="th">Paikka</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {items.map((value, index) => {
          return <TableRow key={value.id}>
          <TableCell>{value.name}</TableCell>
          <TableCell>{value.timeinfo}</TableCell>
          <TableCell>{value.location}</TableCell>
        </TableRow>
        })}
      
    </TableBody>
  </Table>

    </>
  );
};
export default CourseFinder;