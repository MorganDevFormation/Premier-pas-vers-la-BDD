import api from "../api";

export const registerUser = async (user) => {
  return await api("/auth/register", "POST", user);
};

export const loginUser = async (credentials) => {

  // credentials : un objet littéral avec clé username et password pour le nom et le mdp de connexion
  // exemple : { username: 'Josiane', password: 'azertyuiop' }

  const { token } = await api("/auth/login", "POST", credentials);

  // affiche le token
  // le token est représenté par une grande chaîne de caractères
  // console.log(token);
  // alert(token);

  // Demande des informations de l'utilisateur : username + role

  const user = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    method: "GET",
  headers: {
    // entête sous forme de clé / valeur ==> Authorization: "Bearer <token>"
  Authorization: `Bearer ${token}`,
  },
  }).then((res) => res.json());

   // console.log(user);
  // alert(JSON.stringify(user));

  return { token, user };

  // return { token };
};

export const getUser = async () => {
  return await api("/auth/me", "GET");
};
