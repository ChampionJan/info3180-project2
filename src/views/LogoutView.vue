<template>
  <div class="logout-view">
      <div class="logout-text" v-if="logout">
          <h1>You've been successfully logged out!</h1>
          <p>Here are some useful links to regain access to the system.</p>
          <div class="links">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
              <RouterLink to="/register" class="nav-link">Register</RouterLink>
          </div>
      </div>
      <div v-else>
          <h1>Loading...</h1>
      </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import AuthService from '@/services/auth.service.js'
import TokenService from '@/services/token.service.js'
export default {
  
  data(){
      return {
          logout: false
      }
  },
  async beforeMount(){
      let token = await TokenService.getCrsfToken()
      let res = await AuthService.logout(token.csrf_token)
      if(res){
          this.logout = true
          AuthService.handleLogout()
      }
  }
}
</script>

<style scoped>
.logout-view{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  background: #f5efe6;
  margin-top: -1.2rem;
}

.logout-view{
  padding-top: 6rem;
}

.logout-text{
    padding-bottom: 7rem;
}
.logout-text > h1{
  padding-bottom: 2rem;
}

.logout-text > p{
  padding-bottom: 2rem;
}
.links{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
}
.links > a{
    display: inline;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    font-weight: 600;
    color: #ffffff;
    border: 1px solid #4a90e2;
    background-color: #4a90e2;
    border-radius: 6px;
    width: 20%;
    height: 40px;
    justify-self: center;
}
</style>