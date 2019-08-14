<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveUserInfo()" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            action
            :http-request="myUpload"
            class="avatar-uploader"
            :show-file-list="false"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null
      },
      imageUrl: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 自定义上传头像
    myUpload (result) {
      // 选择了图片后,执行当前函数
      const formdate = new FormData()
      formdate.append('photo', result.file)
      this.$http.patch('user/photo', formdate).then(res => {
        // 上传成功   res为响应对象
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 更新本地存储
        store.setUser({ photo: this.userForm.photo })
        // 跟新home的头像
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    async saveUserInfo () {
      // patch 也是修改   局部修改
      // put是完整修改
      await this.$http.patch('user/profile', {
        // 严格按照后台的要求传参
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      // 成功
      this.$message.success('保存设置成功')
      // 更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新home组件的用户名
      eventBus.$emit('updateName', this.userForm.name)
    },
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    }
  }
}
</script>

<style scoped lang='less'></style>
