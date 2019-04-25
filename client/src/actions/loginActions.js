export function handleEmail(email) {
  return {
    type: "HANDLE_EMAIL",
    payload: {
      email: email
    }
  };
}

export function handlePassword(password) {
  return {
    type: "HANDLE_PASSWORD",
    payload: {
      password: password
    }
  };
}

export function handleSubmit(email, password) {
  return {
    type: "HANDLE_SUBMIT",
    payload: {
      email: email,
      password: password
    }
  };
}

export function authenticate(user) {
  return {
    type: "AUTH_CHECK",
    payload: {
      user: user
    }
  };
}

export function signUp(signUp) {
  return {
    type: "SIGN_UP",
    payload: {
      signUp: signUp
    }
  };
}
