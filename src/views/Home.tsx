import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  gotoUser() {
    this.$router.push('/user')
  }
  protected render() {
    return <div>
      <p>Home</p>
      <el-button type="primary" on-click={this.gotoUser}>跳转到用户页面</el-button>
    </div>
  }
}
