<template>
<b-card :header="cardHeader" class="text-left">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Title :" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.title"
          placeholder="Enter title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Category :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.category"
          placeholder="Enter category"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Content :" label-for="input-3">
        <b-form-textarea
        id="input-3"
        v-model="form.content"
        :state="form.content.length >= 200"
        placeholder="Enter at least 200 characters"
        rows="10"
        ></b-form-textarea>
      </b-form-group>
      <b-button variant="warning" @click.prevent="draft()">Draft</b-button>
      <b-button variant="primary" @click.prevent="publish()">Publish</b-button>
    </b-form>
</b-card>
</template>

<script>
  import PostService from '../../service/post'
  export default {
    
    data() {
      return {
        form: {
          title: '',
          category: '',
          content: ''
        },
        show: true
      }
    },
    props:{
        id:{
            type:String,
            default:"0"
        }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      publish(){
          this.submit('publish')
          this.$router.push("/")
      },
      draft(){
          this.submit('draft')
          this.$router.push("/")
      },
      submit(status){
          let data = {
              title:this.form.title,
              category:this.form.category,
              content:this.form.content,
              status:status
          };
          if(!this.$route.params.id){
            PostService.insert(data).then((response)=>{
                console.log(status+" : ", response);
            }).catch((err)=>{
                let errBody = err?.response?.data;
                console.log("Error : ", errBody);
            });
          }else{
            PostService.update(this.$route.params.id, data).then((response)=>{
                console.log(status+" : ", response);
            }).catch((err)=>{
                let errBody = err?.response?.data;
                console.log("Error : ", errBody);
            });
          }
          
      },
      getData(id){
          if (id > 0){
              PostService.getById(id).then((response)=>{
                  console.log("Response getEdit : ", response);
                  this.form.title = response.data.data.Title;
                  this.form.category = response.data.data.Category;
                  this.form.content = response.data.data.Content;
              }).catch((err)=>{
                  console.log("Error : ", err);
              });
          }
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.title = ''
        this.form.category = ''
        this.form.content = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    mounted(){
      this.getData(this.$route.params.id)
    },
    computed:{
        cardHeader(){
            if (this.id > 0){
                return "Edit Post";
            } else {
                return "New Post";
            }
        }
    }
  }
</script>
<style>
label.d-block{
    text-align: left;
}
div.card.text-left{
    max-width: 800px;
}
button.btn{
    margin: 5px;
}
</style>