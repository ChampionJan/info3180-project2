<template>
  <div class="register-container">
      <div class="register-content">
          <h1>Register</h1>
          <RegisterForm />  
      </div>
  </div> 
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'
export default {
  components: { RegisterForm }
}
</script>

<style scoped>
.register-container{
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5efe6;
  margin-top: -1.2rem;
}
.register-content{
  width: 40%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.register-form {
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