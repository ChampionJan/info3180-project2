<template>
  <div class="post my-10">
    <div class="post-header mr-auto">
      <img :src="profile_photo" alt="Image of profile photo" class="img-fluid profile-photo">
      <p><b><a href="#" @click.prevent="viewProfile(user_id)">{{ username }}</a></b></p>
    </div>
    <div class="post-body">
      <img :src="photo" alt="Image of post" class="img-fluid ">
      <p>{{ caption }}</p>
    </div>
    <div class="post-footer">
      <div class="post-likes">
        <div v-if="isLiked">
          <span class="material-icons-outlined favourited" style="color: rgb(255,0,0);">favorite</span>
        </div>
        <div v-else role="button" @click="addLike(id)">
          <span class="material-icons-outlined favourite ">favorite_border</span>
        </div>
        <b><p>{{ `${num_likes} Likes` }}</p></b>
      </div>
      <div class="post-date">
        <b><p>{{ formatDate(created_on) }}</p></b>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/posts.service.js'
import TokenService from "@/services/token.service.js"
export default {

  props: ['id', 'profile_photo', 'username', 'photo', 'caption', 'num_likes', 'created_on', 'isLiked', 'user_id', 'reloadPost'],
  methods: {
    async addLike(id) {
      console.log("HERE WORKING")
      let response = await TokenService.getCrsfToken()
      let res = await PostService.addLike(id, response.csrf_token)
      if (res) {
        console.log(res)
        // await this.fetchCatchDetails()
       await this.reloadPost()
      } else {
        this.error = true
        AuthService.handleLogout()
      }
    },
    viewProfile(user_id) {
      this.$router.push(`/users/${user_id}`)
    },
    formatDate(date) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateObj = new Date(date);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = months[dateObj.getMonth()];
      const year = dateObj.getFullYear().toString();
      return `${day} ${month} ${year}`;
    }
  }
}
</script>

<style scoped>
.post{
  width: 80%;
  height:auto;
  margin-bottom: 50px;
  background-color: #fff;
}
.post{
  border: 1.5px solid #444444;
  border-radius: 5px;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.profile-photo{
  border-radius: 100%;
  width: 25px;
  height: auto;
}

a {
  color: black;
  text-decoration: none;
}

.post-header{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.post-header > img, p{
  margin-top: 15px;
  margin-left: 15px;
}


.post-body{
  width: 100%;
}

.post-body > img{
  width: 100%;
}
.favourite {
  color: #000;
}

.favourited {
  color: #fff;
  fill: 1;
}

.post-footer{
  display: flex;
  justify-content: flex-end; 
  align-items: flex-start; 
}


.post-likes{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-likes {
  margin-right: auto;
}

.post-date {
  margin-left: auto;
}
.material-icons{
  color: rgb(255, 0, 0);
}

.post-likes > div{
  position: relative;
  top: 2px;
  left: 8px;
}

.post-date {
  position: relative;
  right: 18px;
}
</style>