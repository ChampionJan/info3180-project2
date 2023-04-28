<template>
  <div class="new-post-container">
      <div class="new-post-content">
          <h1>New Post</h1>
          <NewPostForm />  
      </div>
  </div> 
</template>

<script>
import NewPostForm from '../components/NewPostForm.vue'
export default {
  components: { NewPostForm }
}
</script>

<style scoped>
.new-post-container{
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5efe6;
  margin-top: -1.2rem;
  padding-bottom: 60px;
}
.new-post-content{
  width: 40%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.post-form {
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
  padding-top: 60px;
}
</style>