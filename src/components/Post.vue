<template>
  <div class="post my-10">
    <div class="post-header mr-auto">
      <img :src="profile_photo" alt="Image of profile photo" class="img-fluid">
      <p><b><a href="#" @click.prevent="viewProfile(user_id)">{{ username }}</a></b></p>
    </div>
    <div class="post-body">
      <img :src="photo" alt="Image of post" class="img-fluid">
      <p>{{ caption }}</p>
    </div>
    <div class="post-footer">
      <div class="post-likes mr-auto">
        <div v-if="isLiked">
          <span class="material-icons-outlined ms-auto favourited" style="color: rgb(255,0,0);">favorite</span>
        </div>
        <div v-else role="button" @click="addLike(id)">
          <span class="material-icons-outlined ms-auto favourite ">favorite_border</span>
        </div>
        <p>{{ `${num_likes} Likes` }}</p>
      </div>
      <div class="post-date ms-auto">
        <p>{{ formatDate(created_on) }}</p>
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
.post {
  width: 300px;
  height: 400px;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.favourite {
  color: #000;
}

.favourited {
  color: #fff;
  fill: 1;
}
.material-icons{
  color: rgb(255, 0, 0);
}
</style>