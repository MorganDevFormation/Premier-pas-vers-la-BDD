export const authStore = $state({ user: null, token: null });

export const setAuth = (user, token) => {
  authStore.user = user;
  authStore.token = token;

   // Enregistrer user et token dans le localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user)); // {username: "toto"; role: {"name"; "admin"}}
};

export const clearAuth = () => {
  authStore.user = null;
  authStore.token = null;

  // Déconnect
  // Supprimer user et token du localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
};

export const getAuth = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (token && user) {
    authStore.user = user;
    authStore.token = token;
  } else {
    authStore.user = null;
    authStore.token = null;
  }
};

export const isAuthenticated = () => {
  return authStore.token;
};
