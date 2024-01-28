import {
  Button,
  Heading,
  useTheme,
  Authenticator,
  View,
} from "@aws-amplify/ui-react";

import { useAuthenticator } from "@aws-amplify/ui-react";

import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);
I18n.setLanguage('fi');

I18n.putVocabularies({
  fi: {
    'Account recovery requires verified contact information':
      'Account recovery requires verified contact information',
    'Add your Profile': 'Add your Profile',
    'Add your Website': 'Add your Website',
    'Back to Sign In': 'Palaa kirjautumiseen',
    'Change Password': 'Vaihda salasana',
    Changing: 'Changing',
    Code: 'Koodi',
    'Confirm Password': 'Vahvista salasana',
    'Confirm Sign Up': 'Vahvista rekisteröityminen',
    'Confirm SMS Code': 'Vahvista tekstiviestikoodi',
    'Confirm TOTP Code': 'Confirm TOTP Code',
    Confirm: 'Vahvista',
    'Confirmation Code': 'Vahvistuskoodi',
    Confirming: 'Vahvistetaan...',
    'Create a new account': 'Luo uusi käyttäjätili',
    'Create Account': 'Luo uusi käyttäjätili',
    'Creating Account': 'Tiliä luodaan...',
    'Current Password': 'Nykyinen salasanasi',
    'Dismiss alert': 'Dismiss alert',
    Email: 'Sähköposti',
    'Enter your Birthdate': 'Enter your Birthdate',
    'Enter your code': 'Koodi',
    'Enter your Confirmation Code': 'Enter your Confirmation Code',
    'Enter your Email': 'Enter your Email',
    'Enter your Family Name': 'Enter your Family Name',
    'Enter your Given Name': 'Enter your Given Name',
    'Enter your Middle Name': 'Enter your Middle Name',
    'Enter your Name': 'Enter your Name',
    'Enter your Nickname': 'Enter your Nickname',
    'Enter your Password': 'Syötä salasanasi',
    'Enter your phone number': 'Enter your phone number',
    'Enter your Preferred Username': 'Enter your Preferred Username',
    'Enter your username': 'Syötä käyttäjätunnuksesi (sähköpostiosoite)',
    'Forgot password?': 'Unohtuiko salasana?',
    'Forgot your password?': 'Unohtuiko salasana?',
    'Hide password': 'Piilota salasana',
    'It may take a minute to arrive': 'Viestin saapumisessa voi kestää hetkinen.',
    Loading: 'Loading',
    'New password': 'Uusi salasana',
    'New Password': 'Uusi salasana',
    or: 'tai',
    Password: 'Salasana',
    'Phone Number': 'Phone Number',
    'Please confirm your Password': 'Vahvista salasanasi',
    'Resend Code': 'Lähetä koodi uudelleen',
    'Reset your password': 'Vaihda salasanasi',
    'Reset your Password': 'Vaihda salasanasi',
    'Send code': 'Lähetä koodi',
    'Send Code': 'Lähetä koodi',
    Sending: 'Lähetetään...',
    'Setup TOTP': 'Setup TOTP',
    'Show password': 'Näytä salasana',
    'Sign in to your account': 'Kirjaudu käyttäjätilillesi',
    'Sign In with Amazon': 'Sign In with Amazon',
    'Sign In with Apple': 'Sign In with Apple',
    'Sign In with Facebook': 'Sign In with Facebook',
    'Sign In with Google': 'Sign In with Google',
    'Sign in': 'Kirjaudu',
    'Sign In': 'Kirjaudu',
    'Signing in': 'Kirjaudutaan...',
    Skip: 'Ohita',
    Submit: 'Lähetä',
    Submitting: 'Lähetetään...',
    'Update password': 'Päivitä salasana',
    Username: 'Sähköpostiosoite',
    'Verify Contact': 'Vahvista yhteystiedot',
    Verify: 'Vahvista',
    'We Emailed You': 'Lähetimme sinulle sähköpostin',
    'We Sent A Code': 'Lähetimme sinulle koodin',
    'We Texted You': 'Lähetimme sinulle tekstiviestin',
    'Your code is on the way. To log in, enter the code we emailed to':
      'Vahvistuskoodisi on matkalla. Kirjautuaksesi, syötä koodi jonka lähetimme osoitteeseen',
    'Your code is on the way. To log in, enter the code we sent you':
      'Your code is on the way. To log in, enter the code we sent you',
    'Your code is on the way. To log in, enter the code we texted to':
      'Your code is on the way. To log in, enter the code we texted to',
  }
});

const components = {
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Kirjaudu sisään
          </Heading>
        );
      },
      Footer() {
        const { toForgotPassword } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toForgotPassword}
              size="small"
              variation="link"
            >
              Unohtunut salasana?
            </Button>
          </View>
        );
      },
    },
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Luo käyttäjätili
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Palaa kirjautumiseen
            </Button>
          </View>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Syötä vahvistuskoodi:
          </Heading>
        );
      },
    },
    SetupTotp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Syötä vahvistuskoodi:
          </Heading>
        );
      },
    },
    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Syötä vahvistuskoodi:
          </Heading>
        );
      },
    },
    ForgotPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Unohtuiko salasana?
          </Heading>
        );
      },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Unohtuiko salasana?
          </Heading>
        );
      },
    },
  };
  
  const formFields = {
    signIn: {
      username: {
        label: 'Sähköpostiosoitteesi',
        placeholder: 'Sähköpostiosoitteesi',
      },
      password: {
        label: 'Salasanasi',
        placeholder: 'Syötä salasana',
      },
    },
    signUp: {
      username: {
        label: 'Sähköpostiosoitteesi',
        placeholder: 'Sähköpostiosoitteesi',
      },
      password: {
        label: 'Salasana',
        placeholder: 'Syötä salasana',
      },
      confirm_password: {
        label: 'Salasana uudelleen',
        placeholder: '... uudelleen',
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Syötä salasanasi:',
      },
    },
    forgotPassword: {
      username: {
        placeholder: 'Syötä salasanasi:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Syötä vahvistuskoodi:',
        isRequired: false,
      },
      confirm_password: {
        label: '.. uudelleen:',
        placeholder: 'Vahvista salasanasi:',
      },
    },
    setupTotp: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
  
  export default function AuthenticationBox() {
    return (
      <Authenticator formFields={formFields} components={components}>
        {({ signOut }) => <button onClick={signOut}>Kirjaudu ulos</button>}
      </Authenticator>
    );
  }