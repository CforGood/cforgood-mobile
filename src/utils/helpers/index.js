
import { Alert } from 'react-native';

export const validateEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return emailRegex.test(email);
}

export const alertUser = (title, message, buttons) => {
  Alert.alert(
    title || 'Oops',
    message || 'Something went wrong...',
    buttons || [{ text: 'Ok', style: 'cancel' }]
  );
}
