import { fetchAuthSession } from "aws-amplify/auth";

export const getAuthHeaderForApiCall = async () => {
  const { tokens } = await fetchAuthSession();
  const idToken = tokens?.idToken;
  const hdr = `Bearer ${idToken}`;

  return hdr;
};
export const getCurrentUserEmail = async () => {
  const { tokens } = await fetchAuthSession();
  const idToken = tokens?.idToken;
  return idToken.payload.email;
};
