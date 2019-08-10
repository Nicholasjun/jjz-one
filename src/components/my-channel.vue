<template>
  <!-- 因为只读不能改,所以不能用v-model -->
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 因为v-model的机制是有一个input事件和v-bind组成,所以接收父元素的值的时候是写的value
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  // watch: {
  //   // 监听reqParams下的channel_id数据
  //   myValue: function (newVal, oldVal) {
  //     if (newVal === '') {
  //       // axios不会将参数提交给后台
  //       this.myValue = null
  //     }
  //   }
  // },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      if (val === '') {
        val = null
      }
      // 提交给父组件
      this.$emit('input', val)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
