<template>
<div>
  <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><router-link to="/">All Posts</router-link></b-navbar-brand>   


    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><router-link to="/new">Add new</router-link></b-nav-item>
        <b-nav-item href="#"><router-link to="/preview">Preview</router-link></b-nav-item>      
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>