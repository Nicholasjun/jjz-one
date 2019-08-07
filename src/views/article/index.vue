<template>
  <div class="container">Article</div>
</template>

<script>
export default {
  created () {
    this.$http.get('/articles').then(res => console.log(res.data))
  }
}
</script>

<style scoped lang='less'></style>
