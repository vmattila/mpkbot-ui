import Home from "./Home";
import Welcome from "./Welcome";
import ShutdownRibbon from "./ShutdownRibbon";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./App.css";

const App = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  return (
    <>
      <ShutdownRibbon />
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "1rem" }}>
        {authStatus !== "authenticated" ? <Welcome /> : <Home />}
      </div>
    </>
  );
};

export default App;
