<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- :rules的意思是绑定校验规则对象 ,:model="form" 绑定整个表单的数据对象 status-icon为输入框后边的那个X-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <!-- prop为指定校验的字段名称 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- prop为指定校验的字段名称 -->
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- v-model="checked"为选还是不选, :value="true"就是默认选中,取消不了,false就是不选中,选不上-->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 自定义校验函数
    // - rule  规则对象
    // - value 字段的值
    // - callback 校验结束的回调函数
    //   - 校验失败  callback(new Error('提示信息'))
    //   - 校验成功 callback()

    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}/.test(value)) {
        return callback(new Error('手机格式不对'))
      } else {
        callback()
      }
    }
    return {
      // 表单的数据对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          // 必填项的意思               不填的话显示这个      失去焦点验证
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // len是要求      校验错误的提示             失去焦点时验证
          { len: 11, message: '请输入11位手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  // - validate 是校验函数  对整个表单进行校验
  // - 别人组件的函数调用： 通过dom对象去调用
  // - 获取el-form组件的dom对象，ref="loginForm"
  // - this.$refs.loginForm.validate()

  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // this.$http
          //   .post(
          //     // 校验成功发起登录请求
          //     'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //     this.loginForm
          //   )
          //   .then(res => {
          //     // res是响应对象   数据属于响应主体   res.data是数据
          //     // console.log(res)
          //     // 存储用户信息
          //     store.setUser(res.data.data)
          //     // 跳转去首页
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误')
          //   })
          // 这个和上边是一样的,下面这个主要演示await使用的时候失败的请求
          // try{可能会执行报错代码}catch(e){处理错误}
          try {
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// scoped是只能在当前组件用的意思
// lang="less"是预编译处理器
.container {
  width: 100%;
  height: 100%;
  // 因为body没有宽高,设置百分百也撑不开,所以弄一个定位.就基于浏览器窗口了
  position: absolute;
  // cover的意思是等比缩放铺满全屏.多余的被裁减
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
