<template>
<div>
    <div>
        <b-card :title="data.title" :sub-title="data.category">
            <b-card-text>
                {{data.content}} 
            </b-card-text>
            <b-button variant="primary" @click.prevent="publish()">Edit</b-button>
            <b-button variant="danger" @click.prevent="trash()">Trash</b-button>
        </b-card>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CardPost',
  props: {
    data: {
      type: Object,
      default: {
          title:"",
          category:"",
          content:"",
          status:"",
          updatedDate:""
      },
    },
  }
}
</script>