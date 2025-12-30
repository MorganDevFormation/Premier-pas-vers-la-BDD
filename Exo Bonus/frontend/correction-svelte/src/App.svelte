<script>
  import Login from './components/Login.svelte';
  import Profile from './components/Profile.svelte';
  import Posts from './components/Posts.svelte';
</script>

<main>
  <h1>SB07 - Révision Auth/Posts</h1>
  <Login />
  <Profile />
  <Posts />
</main>

<style>
  main {
    min-height: 100vh;
    background: linear-gradient(135deg, #232526 0%, #414345 100%);
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  h1 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
</style>
