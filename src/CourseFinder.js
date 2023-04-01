import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useState, useEffect, useCallback } from 'react';

import { Alert, Button, TextField, Expander, ExpanderItem } from '@aws-amplify/ui-react';
import Subscriptions from './Subscriptions';

import CourseList from './CourseList';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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

  const handleAddSubscription = (event) => {
    setItems([]);
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
    setItems([]);
    MySwal.fire({
      title: <p>Oletko varma</p>,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Kyllä, poista',
      denyButtonText: 'Ei, älä poista',
    }).then((resp) => {
      if (resp.isConfirmed) {
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
    })
  }

  const onShowCourses = (subscriptionId, keywords, notKeywords) => {
    setIsLoading(true);
    setItems([]);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/courses?`
      + new URLSearchParams({
        keywords: keywords || '',
        not_keywords: notKeywords || '',
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

      {errorState && <Alert variation="error">{errorState}</Alert> }

      <Subscriptions
        subscriptions={subscriptions}
        onDropSubscription={handleDropSubscription}
        onShowCourses={onShowCourses}
      />

      
{items && items.length > 0 && <CourseList items={items} />}

<Expander type="single" isCollapsible={true} defaultValue={["add"]}>
<ExpanderItem title="Lisää uusi hakuvahti" value="add">
      <h2>Lisää uusi hakuvahti</h2>

      <div>
        <TextField label="Avainsanat" isRequired={true} onChange={handleKeywordChange} />
        <TextField label="Avainsanat, joita ei saa olla" onChange={handleNotKeywordChange} />
        <Button
          variation="primary"
          loadingText="Etsitään..."
          onClick={handleAddSubscription}
          ariaLabel=""
          isLoading={!!isLoading}
          type="submit"
        >
          Lisää hakuvahti
        </Button>
      </div>
</ExpanderItem>
      </Expander>

    </>
  );
};
export default CourseFinder;