<template>
  <div class="post-form">
      <div v-if="error" class="error alert alert-danger">Invalid information</div>
      <div class="alert alert-success" role="alert" v-if="message">{{ message }}</div>
      <form 
          @submit.prevent="addPost" 
          method="post" 
          enctype="multipart/form-data"
          id="postForm"
          ref="postForm"
      >
          <div class="form-field">
              <label for="photo">Photo</label>
              <input 
                  type="file" 
                  name="photo" 
                  id="photo" 
                  ref="photo" 
                  accept="image/png, image/jpg, image/jpeg"
                  @change="handleFileUpload"
                  required
              />
          </div>
          <div class="form-field">
              <label for="caption">Caption</label>
              <textarea 
                  name="caption" 
                  id="caption" 
                  v-model="caption" 
                  cols="30" 
                  rows="3"
                  required
                  placeholder="Write a caption..."
              ></textarea>
          </div>
          <button type="submit" class="submit-btn">Submit</button>
      </form>
  </div>
</template>

<script>
import PostService from '@/services/posts.service.js'
import AuthService from '@/services/auth.service.js'
import TokenService from '@/services/token.service.js'
import ProfileService from '@/services/profile.service.js'
import store from '@/store/store.js'
export default {
  data(){
      return {
          photo: '',
          caption: '',
          error: false,
          message: '',
          csrf: ''
      }
  },
  async created(){
      let res = await TokenService.getCrsfToken()
      this.csrf = res.csrf_token
  },
  methods: {
      handleFileUpload(){
          this.photo = this.$refs.photo.files[0]
      },
      async addPost(){
          let form = document.getElementById("postForm")
          let postInfo = new FormData(form)
          postInfo.append('user_id', store.getters.getUser || localStorage.getItem('id'))
          let res = await ProfileService.addPost(store.getters.getUser, postInfo, this.csrf)
          console.log(res)
          if(res?.errors){
              this.error = true
              AuthService.handleLogout()
          } else {
              this.message = "Post was successfully added!"
              this.$refs.postForm.reset()
          }
      }
  }
}
</script>
<style scoped>
.post-form{
  padding: 0 2rem;
  width: 100%;
}
.post-form, input, textarea, select{
  border: 1px solid rgba(19, 19, 19, 0.1);
  border-radius: 5px;
}
input[type="file"]{
  border: none;
}
.form-field, .submit-btn{
  margin: 2rem 0;
}
input, textarea, select{
  display: block;
}
.submit-btn, input, select{
  width: 100%;
  height: 44px;
}
.submit-btn{
  margin-top: 4rem;
  border: none;
  border-radius: 5px;
  background: #7ed321;
  color: #ffffff;
  font-weight: 650;
  font-size: 18px;
}
.alert{
  margin-top: 1rem;
}
label{
  font-weight: 650;
  font-size: 18px;
  color: #444444;
  padding-left: 5px;
  padding-bottom: 5px;
}
input, textarea{
    border: 1.5px solid #989898;
    width: 100%;
}
#photo{
    color: #000;
    text: #fff!important;
}
input[type=file]::file-selector-button {
  margin-right: 20px;
  border: 1.5px solid #989898;
  background: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
}
</style>