import Home from './Home'
import Welcome from './Welcome'
import { useAuthenticator } from '@aws-amplify/ui-react';

const App = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  return (
    <div style={{"max-width": "1000px", "margin": "auto"}}>
      {authStatus !== 'authenticated' ? <Welcome /> : <Home /> }
    </div>
  )
}

export default App