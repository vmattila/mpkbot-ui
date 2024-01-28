import { useState, useEffect, useMemo } from "react";
import Auth from "@aws-amplify/auth";

export default ({ provider, options }) => {
  const [state, setState] = useState({
    user: {},
    isSignedIn: false,
  });

  const auth = useMemo(() => {
    Auth.configure(options);
    return Auth;
  }, []);

  useEffect(() => {
    auth
      .currentAuthenticatedUser()
      .then((user) => setState({ user, isSignedIn: true }))
      .catch(() => {});
  }, []);

  const signIn = () => auth.federatedSignIn({ provider });
  const signOut = () => auth.signOut();

  return {
    ...state,
    signIn,
    signOut,
  };
};
