// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
// import {
  // auth,
  // signInWithGooglePopup,
  // signInWithGoogleRedirect,
  // createUserDocumentFromAuth,
// } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { AuthenticationContainer } from './auth.styles';

const Authentication = () => {
  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, []);

  return (
    <AuthenticationContainer>
      <SignInForm />
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
