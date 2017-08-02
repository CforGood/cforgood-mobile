
import { AsyncStorage, Alert } from 'react-native';
import FirebaseCrash from 'react-native-firebase-crash-report';
import CryptoJS from 'crypto-js';
import {
  API_URL,
  cloudinary,
} from '../config.json';

class ApiHandler {

  businesses(online, position) {
    return this.api(`businesses?online=${online}&lat=${position.latitude}&lng=${position.longitude}`);
  }

  associations(position) {
    return this.api(`causes?lat=${position.latitude}&lng=${position.longitude}`);
  }

  businessDetail(id, address_id) {
    return this.api(`businesses/${id}?address_id=${address_id}`);
  }

  associationDetail(id) {
    return this.api(`causes/${id}`);
  }

  perkDetail(id) {
    return this.api(`perks/${id}`);
  }

  cause_categories() {
    return this.api(`cause_categories`);
  }

  createCause(cause) {
    return this.api(`causes`, { cause }, 'POST');
  }

  updateProfile(id, params) {
    return this.api(`users/${id}`, params, 'PATCH');
  }

  uses(perk_id) {
    return this.api(`uses`, { use: { perk_id } }, 'POST');
  }

  feedback(id, feedback) {
    return this.api(`uses/${id}`, { use: { feedback } }, 'PATCH');
  }

  sendInvitation(invitations) {
    const contacts = invitations.map(i => {
      return {
        first_name: i.givenName,
        last_name: i.familyName,
        phone: i.phoneNumbers && i.phoneNumbers.number,
        city: (i.postalAddresses && i.postalAddresses[0]) ?
          i.postalAddresses[0].city : ''
      }
    });
    
    const request = {
      method: 'POST',
      body: JSON.stringify({ contacts })
    };

    return this.simpleAPI(request, 'contacts');
  }

  code_partner(location) {
    const { latitude, longitude } = location;

    const request = {
      method: 'GET',
    };
   return this.simpleAPI(request, `partners?lat=${latitude}&lng=${longitude}`);
  }

  async loadUserData() {
    let user = null;
    await AsyncStorage.getItem('@CfoorGoodStore:auth', (err, result) => { user = JSON.parse(result) });
    return this.api(`users/${user.id}`);

  }

  async supportAssociation(id) {
    let user = null;
    await AsyncStorage.getItem('@CfoorGoodStore:auth', (err, result) => { user = JSON.parse(result) });
    return this.api(`users/${user.id}`, { user: { cause_id: id } }, 'PATCH');

  }

  updateUserData(userId, userData) {
    return this.api(`users/${userId}`, { user: userData }, 'PATCH');
  }

  uploadPicture(uri, prevPicture = null) {
    const fileName = uri.split('/').slice(-1)[0];

    const timestamp = (Date.now() / 1000 | 0).toString();
    const apiKey = cloudinary.api_key;
    const apiSecret = cloudinary.api_secret;
    let hashString = 'timestamp=' + timestamp + apiSecret;

    const uploadUrl = 'https://api.cloudinary.com/v1_1/' + cloudinary.cloud + '/image/upload';

    let formdata = new FormData();
    formdata.append('file', { uri: uri, type: `image/${fileName.split('.').slice(-1)[0]}`, name: fileName });
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', apiKey);


    if (prevPicture) {
      let public_id = prevPicture.split('/').slice(-1)[0];//

      public_id = public_id.split('.')[0];//

      console.log('public_idpublic_id', public_id)
      formdata.append('public_id', public_id);

      hashString = hashString + '&public_id=' + public_id;
    }

    const signature = CryptoJS.SHA1(hashString).toString();
    formdata.append('signature', signature);

    return fetch(uploadUrl, {
      method: "POST",
      body: formdata
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log("uploaded", responseJson);
        return Promise.resolve(responseJson);
      }).catch(error => {
        console.log(error);
        return Promise.reject({ error: error.message });
      });
  }

  check(email) {

    let request = {
      method: 'GET',
      headers: {
        'email': email,
      },
    };
    try {
      return fetch(`${API_URL}/check`, request)
        .then(response => {
          if (response.status === 200) {
            return Promise.resolve({ exist: true });
          }
          else {
            return Promise.resolve({ exist: false });
          }
        })
        .catch(error => {
          Promise.resolve({ exist: false });
        });

    } catch (e) {
      return Promise.reject({ error: 'un problème technique est survenu, veuillez réessayer plus tard ?' });
    }
  };

  signin(email, password, type) {

    let request = {
      method: 'POST',
      headers: {
        'email': email,
        'password': password,
      },
    };

    if (type === 'facebook') {

      request = {
        method: 'POST',
        headers: {
          'email': email,
          'access_token': password,
        }
      };
    }

    try {

      return fetch(`${API_URL}`, request)
        .then(response => {
          return response.json();
        })
        .then(async (responseJson) => {
          if (responseJson.errors || responseJson.error) {
            return Promise.reject({ error: responseJson.errors || responseJson.error });
          }
          else {
            await AsyncStorage.setItem('@CfoorGoodStore:auth', JSON.stringify(responseJson));
            return Promise.resolve(responseJson);
          }
        })
        .catch(error => {
          return Promise.reject({ error: error.errors || error.error || error.message });
        });
    } catch (e) {
      return Promise.reject({ error: 'un problème technique est survenu, veuillez réessayer plus tard ?' });
    }
  };

  signup(user) {

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: user })
    };

    return fetch(`${API_URL}/users`, request)
      .then(response => {
        return response.json();
      })
      .then((responseJson) => {
        return Promise.resolve(responseJson);
      })
      .catch(error => {
        console.log('catchAPI', error)
        return Promise.reject({ error: error.message });
      })
  }

  async api(endpoint, params = null, method = 'get') {

    try {

      let user = null;
      await AsyncStorage.getItem('@CfoorGoodStore:auth', (err, result) => {
        user = JSON.parse(result)
      });

      let request = {
        method,
        headers: {
          'X-User-Email': user.email,
          'X-User-Token': user.authentication_token,
        },
      };


      if (params && method !== 'get') {
        request.body = JSON.stringify(params);
        if (method !== 'get') {
          request.headers['Content-Type'] = 'application/json';
        }
      }


      return fetch(`${API_URL}/${endpoint}`, request)
        .then(response => {
          if (response.status === 401) {
            AsyncStorage.removeItem('@CfoorGoodStore:auth');
          }
          return response.json();
        })
        .then((responseJson) => {
          return responseJson;
        })
        .catch(error => {
          return Promise.reject({ error: 'un problème technique est survenu, veuillez réessayer plus tard ?' });
        })

    } catch (e) {
      return Promise.reject({ error: 'un problème technique est survenu, veuillez réessayer plus tard ?' });
    }
  }


  simpleAPI(request, endpoint) {

    try {
      return fetch(`${API_URL}/${endpoint}`, request)
        .then(response => {
          return response.json();
        })
        .then((responseJson) => {
          return Promise.resolve(responseJson);
        })
        .catch(error => {
          Promise.resolve({ exist: false });
        });

    } catch (e) {
      return Promise.reject({ error: 'un problème technique est survenu, veuillez réessayer plus tard ?' });
    }
  };

}

export default new ApiHandler();
