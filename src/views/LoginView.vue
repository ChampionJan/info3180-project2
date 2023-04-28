<template>
  <div class="login-container">
      <div class="login-content">
          <h1>Login</h1>
          <LoginForm />  
      </div>
  </div> 
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  components: { LoginForm }
}
</script>

<style scoped>
.login-container{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5efe6;
  margin-top: -1.2rem;
}
.login-content{
  width: 40%;
  display: flex;
  align-items: left;
  flex-direction: column;
}

.login-form {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  border: 2px solid #989898;
}

h1{
  font-weight: 700;
  font-size: 24px;
  color: #444444;
  padding-top: 120px;
}
</style>