<template>
  <div class="profile-container">
        <div class="profile-info" v-if="user">
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
                        <h6 class="card-title name">{{ user.name }}</h6>
                        <p class="card-text text-muted location">{{ user.location }}</p>
                        <p class="card-text text-muted join-date">{{ `Member since ${formattedDate(user.joined_on) }` }}</p>
                        <p class="card-text text-muted biography">{{ user.biography }}</p>    
                    </div>
                </div>
                <div class="profile-item-large flex-item-slightly-bigger">
                  <div class="row">
                    <div class="profile-item">
                      <p class="profile-item profile-item-info number post-number">{{ user.numposts }}</p>
                      <p class="profile-item profile-item-info post-text">Posts</p>
                    </div>
                    <div class="profile-item">
                      <p class="profile-item profile-item-info number follower-number">{{ user.numfollowers }}</p>
                      <p class="profile-item profile-item-info follower-text">Followers</p>
                    </div>
                  </div>
                  <div class="row bit-bigger">
                    <div v-if="user.isFollowed" class="following">
                      <button class="following-btn" v-bind:isDisabled = true>Following</button>
                    </div>
                    <div v-else  class="follow" role="button" @click="FollowUser(user.id)">
                      <button class="follow-btn">Follow</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="post-container">
          <div class="post-view gallery" >
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
  watch: {
    '$route.params': {
        handler(newValue) {   
            this.loadPage()
        },
        immediate: true,
    }
},
  async beforeMount(){
    await this.loadPage()
  }
}
</script>

<style scoped>
.profile-container{
  background: #f5efe6;
  margin-top: -1.2rem;
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 840px) {
  .profile{
    width: 100%;
  }
}
.post-container{
  margin-top: 5rem;
  margin-left: 5rem;
  margin-right: 5rem;
}
.post-container h1{
  margin: 1rem 0;
}
.profile-img{
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
}
.profile-info{
  width: 90%;
  height: 200px;
  display: flex;
  position: relative;
  top: 1.2em;
  margin-left: 5em;
  background-color: #fff;
  border: 1.5px solid #444444;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  align-self: center;
}
.profile-item{
  flex: 1 0 0%;
}
.profile-item-large{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row{
  width: 100%;
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
  display: flex;
  flex-direction: column;
}

.flex-item-slightly-bigger > div{
  display: flex;
  justify-content: center;
}

.profile-img{
  border-radius: 100%;
  width: 75%;
  height: auto;
  display: inline;
  align-self: center;
  justify-self: center;
}

.name{
  position: relative;
  bottom: 20px;
  font-weight: 800;
  font-size: 22px;
}

.join-date{
  position: relative;
  bottom: 15px;
}

.biography{
  position: relative;
  bottom: 15px;
}

.profile-item-info{
  font-weight: 700;
  font-size: 20px;
  color: #777777
}

.number{
  color: #000;
}

.bit-bigger{
  height: 40%
}

.post-number{
  position: relative;
  top: 10px;
  left: 70px;
}

.post-text{
  position: relative;
  top: 5px;
  left: 55px;
}

.follower-number{
  position: relative;
  top: 10px;
  left: 25px;
}

.follower-text{
  position: relative;
  top: 5px;
  right: 10px;
}
.following-btn{
  width: 70%;
  cursor: auto!important;
  background-color: #0eb881;
  color: #fff;
  border: #0eb881 1px solid;
  border-radius: 3px;
  height: 50%;
  font-weight: 600;
  position: relative;
  top: 25px;
  left: 45px;
}

.follow-btn{
  width: 70%;
  background-color: #4a90e2;
  color: #fff;
  border: #4a90e2 1px solid;
  border-radius: 3px;
  height: 50%;
  font-weight: 600;
  position: relative;
  top: 30px;
  left: 45px;
}

.post-container{
  width: 90%;
}
.gallery{
  display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-column-end: 1em;
    row-gap: 1em;
    column-gap: 1em;
}

div.gallery img{
    width: 25rem;
    height: 20rem;
}
</style>