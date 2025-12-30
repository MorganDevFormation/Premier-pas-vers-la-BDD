const API_BASE_URL = 'http://localhost:3000';

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }

  return data;
}

export async function getProfile() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la récupération du profil');
  }

  return data;
}

export async function getPosts() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/api/posts`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la récupération des posts');
  }

  return data.posts || [];
}

export async function createPost(title, content, categoryId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, categoryId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la création du post');
  }

  return data;
}

export async function getCategories() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la récupération des catégories');
  }

  return data;
} 