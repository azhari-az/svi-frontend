<template>
    <div>
        <b-container>
            <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-fluid
            :title="preview.Title"
            >
                <b-card-text>
                    {{preview.Content}}
                </b-card-text>
            </b-card>
            <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            per-page="1"
            align="right"
            size="md"
            class="my-0"
            @change="getData"
            ></b-pagination>
            <!-- <ul v-for="article in articles" :key="article">
                <h3>{{article.Title}}</h3>
                <br>
                <p class="text-justify">{{article.Content}}</p>
            </ul> -->
        </b-container>
    </div>
</template>
<script>
import PostService from '../../service/post'
export default {
    data(){
        return{
            preview: {},
            currentPage: 1,
            published: []
        }
    },
    methods:{
        getData(x){
            this.currentPage = x
            PostService.getAllPost(1, this.currentPage).then((response)=>{
                console.log("current", this.currentPage)
                let post = response.data.data[0];
                if (post.Status === 'publish'){
                    this.preview = post
                }
            }).catch((err)=>{
                console.log("Response err : ", err);
            });
        },
        getAllData(){
            PostService.getAllPost(1000, 1).then((response)=>{
                let posts = response.data.data;
                if (posts){
                    this.published = posts.filter(item => item.Status == 'publish');
                }
            }).catch((err)=>{
                console.log("Response err : ", err);
            });
        }
    },
    mounted(){
        this.getData();
        this.getAllData();
    },
    computed:{
        totalRows(){
            return this.published.length
        }
    }
    
}
</script>
<style>

</style>