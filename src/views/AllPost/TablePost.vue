<template>
  <b-container fluid>
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      small
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button size="md" variant="primary" class="mb-2" @click="edit(row)">
          <b-icon icon="pencil" aria-label="Help" class="text-light"></b-icon>
        </b-button>
        <b-button size="md" variant="danger" class="mb-2" @click="trash(row)">
          <b-icon icon="trash" aria-label="Help"></b-icon>
        </b-button>
      </template>
    </b-table>
    <b-row>
    <b-col md="2" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-md="6"
          label-align-sm="right"
          label-size="md"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="md"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="10" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          size="md"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PostService from '../../service/post'
  export default {
    props:{
        items:{
            type:Array,
            default(){
                return [];
            }
        },
    },
    data() {
      return {
        fields: [
          { key: 'Title', label: 'Title', sortable: true, sortDirection: 'desc', tdClass:  'text-left'},
          { key: 'Category', label: 'Category', sortable: true, sortDirection: 'desc' },
          { key: 'Actions', label: 'Actions' }
        ],
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        srcEdit: ''
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
      totalRows(){
        return this.items.length
      }
    },
    methods: {
      edit(item) {
        this.$router.push('/edit/'+ item.item.Id)
      },
      trash(item){
        this.$emit('clicked', item)
      }
    }
  }
</script>