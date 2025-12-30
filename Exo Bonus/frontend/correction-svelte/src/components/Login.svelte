<form>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" required placeholder="votre@email.com" />
  </div>
  <div class="form-group">
    <label for="password">Mot de passe</label>
    <input type="password" id="password" required placeholder="Votre mot de passe" />
  </div>
  <button type="submit">Se connecter</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  label {
    color: white;
    font-size: 14px;
  }
  input {
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 16px;
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style> 