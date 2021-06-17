<template>
  <div id="app">
      <div>
        <h3>Hello world</h3>
        <p>{{message}}</p>
        <button v-on:click="change_text">change</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: "button is not clicked"
    }
  },
  methods: {
    change_text() {
      this.message = "button was clicked"
    }
  }
}
</script>

<style>

</style>