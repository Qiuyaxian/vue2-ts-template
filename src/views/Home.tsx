import { Component, Vue } from 'vue-property-decorator'
import Acount from './components/Acount'

@Component
export default class Home extends Vue {
  acount: number = 100
  gotoUser() {
    this.$router.push('/user')
  }
  addAcount(n: number) {
    this.acount = n
  }
  protected render() {
    return <div>
      <p>Home</p>
      <Acount acount={this.acount} on-add-acount={this.addAcount}></Acount>
      <br />
      <el-button type="primary" on-click={this.gotoUser}>跳转到用户页面</el-button>
    </div>
  }
}
