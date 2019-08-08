<template>
  <div class="container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="samll">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import MyBread from '@/components/my-bread.vue'
export default {
  components: { MyBread },
  data () {
    return {
      // 收集请求参数(表单数据)
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的下拉选项数据
      channelOptions: [{ label: 'js', value: '1000' }],
      dateArr: []
    }
  },
  created () {
    this.$http.get('/articles').then(res => console.log(res.data))
  }
}
</script>

<style scoped lang='less'></style>
