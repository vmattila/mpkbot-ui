import CourseFinder from './CourseFinder';
import { Auth } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';
const Home = () => {
  return (
    <>
      <Button
        variation="default"
        onClick={() => Auth.signOut()}
        ariaLabel=""
      >
        Kirjaudu ulos
      </Button>
      <CourseFinder />
    </>
  );
};
export default Home;