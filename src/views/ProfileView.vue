<template>
  <div class="profile container">
        <div class="card" v-if="user">
            <div class="row">
                <div class="profile-item-large flex-item-slightly-big">
                    <img 
                      :src="`../../uploads/${user.photo}`" 
                      class="img-fluid profile-img" 
                      alt="User's profile"
                    >
                </div>
                <div class="profile-item-large flex-item-longer">
                    <div class="card-body">
                        <h6 class="card-title">{{ user.name }}</h6>
                        <p class="card-text text-muted">{{ user.location }}</p>
                        <p class="card-text text-muted">{{ `Member since ${formattedDate(user.joined_on) }` }}</p>
                        <p class="card-text text-muted">{{ user.biography }}</p>    
                    </div>
                </div>
                <div class="profile-item-large flex-item-slightly-bigger">
                  <div class="row">
                    <div class="profile-item">
                      <p class="profile-item">{{ user.numposts }}</p>
                      <p class="profile-item">Posts</p>
                    </div>
                    <div class="profile-item">
                      <p class="profile-item">{{ user.numfollowers }}</p>
                      <p class="profile-item">Followers</p>
                    </div>
                  </div>
                  <div class="row">
                    <div v-if="user.isFollowed" class="following">
                      <button class="follow-btn" v-bind:isDisabled = true>Following</button>
                    </div>
                    <div v-else  class="follow" role="button" @click="FollowUser(user.id)">
                      <button class="follow-btn">Follow</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="post-container">
          <div class="post-view">
            <div v-for="post in posts" :key="post.user_id">
              <img :src="`../uploads/${post.photo}`" alt="Image of post">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import ProfileService from '@/services/profile.service.js'
import TokenService from '@/services/token.service.js'
import AuthService from '@/services/auth.service.js'
import store from '@/store/store'
export default {
  data(){
    return {
      user: null,
      posts: [],
      error: false,
      message: '',
    }
  },
  methods: {
    formattedDate(date_joined) {
      const dateObj = new Date(date_joined);
      const options = { year: 'numeric', month: 'long' };

      return dateObj.toLocaleDateString('en-US', options);
    },
    async FollowUser(id){
            let response = await TokenService.getCrsfToken()
            let res = await ProfileService.addFollow(id, response.csrf_token)
             if(res){
                console.log(res)
                await this.loadPage()
            } else {
                this.error = true
                AuthService.handleLogout()
            }
        },

    async loadPage(){
      let id = this.$route.params.id
    let user = await ProfileService.getUser(id)
    if(user){
      this.user = {...user[0]}
      console.log(user.photo)
      let posts = await ProfileService.getPosts(id)
      if(posts){
        this.error = false
        this.posts = [...posts]
      }else{
        AuthService.handleLogout()
      }
    }else{
      AuthService.handleLogout()
    }
    }
  },
  async beforeMount(){
    await this.loadPage()
  }
}
</script>

<style scoped>
.profile{
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 840px) {
  .profile{
    width: 100%;
  }
}
.post-container{
  margin: 2rem 0;
}
.post-container h1{
  margin: 1rem 0;
}
.profile-img{
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
}
.card{
  width: 100%;
}
.profile-item{
  flex: 1 0 0%;
}
.profile-item-large{
  flex: 1;
}

.flex-item-longer {
  flex-basis: 40%;
}
.flex-item-slightly-big {
  flex-grow: 1;
  flex-basis: 5%;
}
.flex-item-slightly-bigger {
  flex-grow: 1;
  flex-basis: 10%;
}
</style>