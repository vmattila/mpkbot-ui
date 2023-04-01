import Home from './Home'
import Welcome from './Welcome'
import { useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  return (
    <div class="container">
      {authStatus === 'configuring' && 'Odota hetki...'}
      {authStatus !== 'authenticated' ? <Welcome /> : <Home /> }
    </div>
  )
}

export default App