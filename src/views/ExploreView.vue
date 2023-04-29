<template>
  <div class="about-container">
    <div class="posts-view">
      <Post 
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :profile_photo="`../uploads/${post.profile_photo}`"
        :username="post.username"
        :photo="`../uploads/${post.photo}`"
        :caption="post.caption"
        :num_likes="post.num_likes"
        :created_on="post.created_on"
        :isLiked = "post.isLiked"
        :user_id = "post.user_id"
        :reloadPost="getPosts"
      />
    </div>
    <div class="make-post-container">
      <RouterLink to="/posts/new" class="make-post link"><p>New Post</p></RouterLink>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router"
import PostService from '@/services/posts.service.js'
import Post from '../components/Post.vue'
export default {
    components: { Post },
    data(){
        return {
            posts: []
        }
    },
    async beforeMount(){
     await this.getPosts()
    },
    methods: {
      async getPosts(){
        let res = await PostService.getAllPosts()
      if(res){
        this.posts = [...res.data]
        console.log(res.data)
      } else {
        this.error = true
        AuthService.handleLogout()
      }
      }
    }
}
</script>

<style scoped>
.about-container{
  width: 100%;
  display: flex;
  background: #f5efe6;
  margin-top: -1.2rem;
}
.posts-view{
  width: 70%;
  height: 100%;
  display: inline-block;
  margin-left: 10em;
  margin-top: 25px;
}
.make-post-container{
  width: 50%;
  height: 100%;
  display: inline-block;
  position: -webkit-sticky;
  position: sticky;
  top: 80px;
  text-align: center;
  justify-content: center;
}
form{
  padding: 1rem;
}
input{
  display: block;
  border: 1px solid rgba(19, 19, 19, 0.1);
  border-radius: 5px;
}
.col{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
}
.submit-btn, input, textarea, select{
    width: 100%;
    height: 44px;
}
.submit-btn{
    border: none;
    border-radius: 5px;
    background: #0eb881;
    color: #ffffff;
}
.cards-view{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 4rem 0;
}
.link{
  height: 44px;
  background: #4a90e2;
  color: #ffffff;
  padding: 16px 32px;
  border: 1px solid #4a90e2;
  border-radius: 6px;
  text-decoration: none;
  margin-right: 12px;
  font-weight: 600;
}
.make-post{
  display: inline-block;
  width: 40%;
  align-items: center;
}

.make-post > p{
  position: relative;
  bottom: 6px;
}
</style>