<template>
  <div id="app">
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <navbar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
import NavBar from './components/layouts/TheNavBar.vue'
import PostService from './service/post'
export default {
  components:{
    navbar:NavBar
  },
  mounted(){      
    console.log("URL : ", PostService.urlApi);
    PostService.getAllPost(0, 1).then((respones)=>{
        console.log("response : ", respones);
      }).catch((err) =>{
        console.log("Error : ", err);
      });
  },
  method:{
    async getAllPost(){

    }
  }
}
</script>
<style>
.content{
  margin: 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
