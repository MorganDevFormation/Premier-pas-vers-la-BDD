<div class="posts">
  <h2>Publications</h2>
  <form class="new-post">
    <input type="text" placeholder="Titre de la publication" required />
    <textarea placeholder="Contenu de la publication" required></textarea>
    <select required>
      <option value="" disabled selected>Choisir une catégorie</option>
      <option value="1">Catégorie 1</option>
      <option value="2">Catégorie 2</option>
    </select>
    <button type="submit">Publier</button>
  </form>
  <div class="posts-list">
    <div class="post">
      <h3>Titre du post</h3>
      <p>Contenu du post...</p>
      <div class="post-meta">
        <span>Par Anonyme</span>
        <span>01/01/2024</span>
        <span>Catégorie : Catégorie 1</span>
      </div>
    </div>
    <div class="post">
      <h3>Un autre post</h3>
      <p>Encore un contenu fictif.</p>
      <div class="post-meta">
        <span>Par Utilisateur</span>
        <span>02/01/2024</span>
        <span>Catégorie : Catégorie 2</span>
      </div>
    </div>
  </div>
</div>

<style>
  .posts {
    max-width: 800px;
    margin: 0 auto;
  }
  h2 {
    color: white;
    margin-bottom: 20px;
  }
  .new-post {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }
  input, textarea, select {
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    background: rgba(30, 30, 30, 0.8);
    color: #fff;
  }
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  select option {
    background: #222;
    color: #fff;
  }
  button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .post {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }
  .post h3 {
    color: white;
    margin: 0 0 10px 0;
  }
  .post p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 15px 0;
  }
  .post-meta {
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }
</style>