import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useState, useEffect, useCallback } from 'react';

import { Alert, Button, TextField, Expander, ExpanderItem, Loader, Flex, Text } from '@aws-amplify/ui-react';
import Subscriptions from './Subscriptions';
import SearchTokens from './SearchTokens';

import CourseList from './CourseList';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const CourseFinder = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [errorState, setError] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokensSearched, setTokensSearched] = useState([]);
  const [showAddNewSubscription, setShowAddNewSubscription] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const parts = keyword.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const filtered = parts.map(e => e.trim()).filter((x) => {
      return x.length > 1
    }).filter((value, index, array) => array.indexOf(value) === index);
    setTokens(filtered);
  }, [keyword]);

  const handleAddSubscription = (event) => {
    setItems([]);
    setIsLoading(true);
    setShowAddNewSubscription(false)
    setError(undefined);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/subscriptions`,{
      method: "POST",
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`},
      body: JSON.stringify({
        tokens: tokens,
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setKeyword('');
          setTokens([]);
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
    setError(undefined);
    setShowAddNewSubscription(false)
    MySwal.fire({
      title: <p>Oletko varma, että haluat poistaa vahdin?</p>,
      showDenyButton: true,
      showCancelButton: false,
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

  const onShowCourses = (subscriptionId, keywords) => {
    setIsLoading(true);
    setError(undefined);
    setItems([]);
    setTokensSearched([]);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/courses?`
      + new URLSearchParams({
        tokens: JSON.stringify(keywords),
    }),{
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`}
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setItems(result.courses);
          setTokensSearched(keywords);
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
    setError(undefined);
    setSubscriptions([]);
    fetch(`${process.env.REACT_APP_API_URL_BASE}/subscriptions`,{
      headers: {Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`}
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setSubscriptions(result.subscriptions);
          setShowAddNewSubscription(result.subscriptions.length === 0)
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
    <Flex direction="column">

      {errorState && <Alert variation="error">{errorState.message}</Alert> }

      <Subscriptions
        subscriptions={subscriptions}
        onDropSubscription={handleDropSubscription}
        onShowCourses={onShowCourses}
        isLoading={!!isLoading}
      />

      <Expander type="single" isCollapsible={true} defaultValue={showAddNewSubscription ? "add" : ""}>
        <ExpanderItem title={
          <Text fontWeight={600}>Lisää uusi hakuvahti</Text>
        } value="add">
              <Flex direction="column">
                <TextField
                  label="Hakuehto"
                  isRequired={true}
                  value={keyword}
                  onChange={(e) => setKeyword(e.currentTarget.value)}
                  placeholder={"esim. tiedustelu -osint"}
                />
                <SearchTokens tokens={tokens}></SearchTokens>

                <Flex direction="row">
                  <Button
                    variation="primary"
                    loadingText="..."
                    onClick={handleAddSubscription}
                    ariaLabel=""
                    isLoading={!!isLoading}
                    isDisabled={!(tokens && tokens.length > 0)}
                    type="submit"
                  >
                    Lisää uusi hakuvahti
                  </Button>

                  <Button
                    variation="default"
                    loadingText="..."
                    onClick={() => {
                      onShowCourses(undefined, tokens)
                    }}
                    ariaLabel=""
                    isLoading={!!isLoading}
                    isDisabled={!(tokens && tokens.length > 0)}
                  >
                    Esikatsele kursseja tällä hakuehdolla
                  </Button>
                </Flex>

                <Text fontSize="small">
                      Esimerkkejä hakuehdoista:
                      <ul>
                        <li><Text as="span" fontFamily={"monospace"} fontWeight={600} style={{color: "darkred"}}>sra peruskurssi</Text> löytää SRA-peruskurssit</li>
                        <li><Text as="span" fontFamily={"monospace"} fontWeight={600} style={{color: "darkred"}}>ammunta upinniemi</Text> löytää kaikki Upinniemessä järjestettävät ammunnat</li>
                        <li><Text as="span" fontFamily={"monospace"} fontWeight={600} style={{color: "darkred"}}>"kunnossa inttiin" niinisalo</Text> löytää kaikki Niinisalossa järjestettävät Kunnossa inttiin -kurssit</li>
                        <li><Text as="span" fontFamily={"monospace"} fontWeight={600} style={{color: "darkred"}}>tiedustelu -osint</Text> löytää tiedusteluun liittyvät kurssit, mutta jättää pois osint-kurssit</li>
                      </ul>
                    </Text>
              </Flex>
        </ExpanderItem>
      </Expander>

      
      {!!isLoading && <Loader />}
      {tokensSearched && tokensSearched.length > 0 && !items.length && <Alert variation="info">Kursseja ei löytynyt hakuehdoilla {tokensSearched.join(" ")}</Alert>}
      {tokensSearched && tokensSearched.length > 0 && items.length > 0 && <CourseList items={items} />}

    </Flex>
  );
};
export default CourseFinder;