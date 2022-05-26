<template>
  <div>
  <b-card title="Article" body-class="text-center" header-tag="nav">
    <template #header>
      <b-nav card-header tabs>
        <b-nav-item :active="(currentTab=='Published')" @click="tabClick('Published')">Published ({{published.length}})</b-nav-item>
        <b-nav-item :active="(currentTab=='Drafted')" @click="tabClick('Drafted')">Drafted ({{drafted.length}})</b-nav-item>
        <b-nav-item :active="(currentTab=='Trashed')" @click="tabClick('Trashed')">Trashed ({{trashed.length}})</b-nav-item>
      </b-nav>
    </template>

    <b-card-text> 
        <table-post :items="getItems" @clicked="trash" @changed="coba"/>
    </b-card-text>
  </b-card>
</div>
</template>

<script>
import TablePost from './TablePost.vue'
import PostService from '../../service/post'
export default {
    components:{
        'table-post':TablePost
    },
    data(){
        return{
            currentTab:'Published',
            trashed:[],
            published:[],
            drafted:[]
        }
    },
    mounted(){
        this.getAllData();
    },
    methods:{
        tabClick(tab){
            console.log("Items : ", this.getItems);
            this.currentTab = tab;
        },
        getAllData(){
            PostService.getAllPost(1000, 1).then((response)=>{
                let posts = response.data.data;
                if (posts){
                    this.trashed = posts.filter(item => item.Status == 'trash');
                    this.published = posts.filter(item => item.Status == 'publish');
                    this.drafted = posts.filter(item => item.Status == 'draft');
                }
            }).catch((err)=>{
                console.log("Response err : ", err);
            });
        },
        trash(item){
            item.item.Status = 'trash'
            let data = item.item
            PostService.update(item.item.Id, data).then((response)=>{
                console.log("cek : ", response);
                this.getAllData()
            }).catch((err)=>{
                let errBody = err?.response?.data;
                console.log("Error : ", errBody);
            })
        },

        coba(x){
            console.log(x)
        }

    },
    computed:{
        getItems(){
            this.published
            this.drafted
            this.trashed
            switch(this.currentTab){
                case 'Published': return this.published;
                case 'Drafted': return this.drafted;
                case 'Trashed': return this.trashed;
            }
        }
    }

}
</script>

<style>

</style>