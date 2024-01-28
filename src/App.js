import Home from './Home'
import Welcome from './Welcome'
import { useAuthenticator } from '@aws-amplify/ui-react';

const App = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  return (
    <div style={{ maxWidth: "1000px", margin: "auto", "padding": "1rem" }}>
      {authStatus !== 'authenticated' ? <Welcome /> : <Home />}
    </div>
  )
}

export default App