import { Auth } from 'aws-amplify';

const Welcome = () => {
  return (
    <>
      <button onClick={() => Auth.federatedSignIn()}>
        Redirect to Cognito Hosted UI
    </button>
    </>
  );
};
export default Welcome;