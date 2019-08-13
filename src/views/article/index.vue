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
          <!-- clearable为清空单选,频道需要清空功能 -->
          <!-- 使用组件了 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果:</div>
      <!-- 表格组件 -->
      <!-- el-table 表格容器 -->
      <!--  :data="tableData"  data表格依赖数据 类型数组 -->
      <el-table :data="articles">
        <!-- el-table-colum 列组件 -->
        <!-- prop="date" 指定当前列的每一行显示的数据的字段名称 -->
        <!-- label="日期" 标题 -->
        <!-- 第一列!!!!!!!!!!!! -->
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 获取到的图片,scope.row就相当于是v-for里的item -->
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error">
                <!-- 如果加载不出来的话显示下面这个图 -->
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <!-- 第二列!!!!!!!!!!!! -->
        <el-table-column label="标题" prop="title"></el-table-column>
        <!-- 第三列!!!!!!!!!!!! -->
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px">
        <!-- total 指定总条数 -->
        <!-- layout为布局的意思prev为左箭头,pager为中间分页,next为右箭头,total为共有多少条数据 -->
        <el-pagination
          background
          layout="prev, pager, next,total"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  components: { MyBread, MyChannel },
  data () {
    return {
      // 收集请求参数(表单数据)
      reqParams: {
        // 如果不想默认数据提交给后台,就定义为null
        // 状态:
        status: null,
        // 频道索引,默认选第几个
        channel_id: null,
        // 下面俩是代表的日期
        begin_pubdate: null,
        end_pubdate: null,
        // 代表第几页:默认选第几页
        page: 1,
        // 代表一页有多少条数据，最少十条
        per_page: 20
      },
      // 频道的下拉选项数据
      // channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 计算属性computed,当你需要一个新数据,依赖data中的数据得到,当data中的数据改变,计算属性也会改变
  // 侦听器watch,  当你需要监听摸个data数据改变,改变后做心梗开销较大操作时(比如异步操作).
  // watch: {
  //   // 监听reqParams下的channel_id数据
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       // axios不会将参数提交给后台
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  created () {
    this.$http.get('/articles').then(res => console.log(res.data))
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 编辑文章
    edit (id) {
      // 发布文章和编辑文章使用的是同一个路由规则
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章
    del () {
      // 1.弹出一个确认框
      // 2.点击确认  发起删除请求
      // 3.删除功能
      this.$confirm('亲,此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async id => {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除文章成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    // 选择日期后的函数
    changeDate (dateArr) {
      // dateArr[起始位置,结束位置]
      // 把日期格式转换格式,使用moment插件即可,但是不需要这么麻烦

      // dateArr有清空功能,所以要严谨处理,按以下处理
      console.log(dateArr)
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 当你更改组件的当前页码的时候,拿着新的页码重新请求渲染列表
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      const {
        data: { data }
        // 请求方式是get,第二个参数是一个对象{params:指定参数对象}
      } = await this.$http.get('articles', { params: this.reqParams })
      // 文章列表
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
