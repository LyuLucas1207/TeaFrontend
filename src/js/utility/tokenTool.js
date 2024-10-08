import { jwtDecode } from 'jwt-decode';


function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
}

function decodeToken(token) {
    if (!token) {
        return null;
    }
    return jwtDecode(token);
    /*
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "2993798118@qq.com",
      "role": "superadmin",
      "iat": 1630000000,
      "exp": 1630003600
    }
    */
}

function getFirstName() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).firstName;
}

function getLastName() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).lastName;
}

function getEmail() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).email;
}

function getRole() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwtDecode(token).role;
}

export { getToken, setToken, removeToken, decodeToken, getFirstName, getLastName, getEmail, getRole };

