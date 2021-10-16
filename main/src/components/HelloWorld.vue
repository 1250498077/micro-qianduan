<template>
  <div class="hello">
    <button v-on:click="childrenToFather">清除沙箱{{this.$store.state.visible}}</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    childrenToFather: () => {
      console.log('main里面的方法被调用', this.$store)
      this.$store.commit({
        type: 'change',
        visible: this.$store.state.visible + 1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
