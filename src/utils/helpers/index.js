
import { Alert } from 'react-native';

export const validateEmail = (email) => {
  const emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/;

  return emailReg.test(email);
}

export const alertUser = (title, message, buttons) => {
  Alert.alert(
    title || 'Oops',
    message || 'Something went wrong...',
    buttons || [{ text: 'Ok', style: 'cancel' }]
  );
}
