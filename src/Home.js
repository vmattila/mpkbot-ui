import { useAuthenticator } from '@aws-amplify/ui-react';
import CourseFinder from './CourseFinder';
import { Auth } from 'aws-amplify';

const Home = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={() => Auth.signOut()}>
        Signout
    </button>
      <CourseFinder />
    </>
  );
};
export default Home;