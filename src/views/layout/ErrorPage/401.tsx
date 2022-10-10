import { Component, Vue } from 'vue-property-decorator'
import ErrorPage from './ErrorPage'

@Component({
  beforeRouteEnter(to: any, from: any, next: Function) {
    next(async (vm: any) => {
      if (vm.$store.getters['user/loggedIn']) {
        return vm.$router.replace({ name: 'Home' })
      } else {
        vm.retry()
      }
    })
  }
})
export default class ErrorPage401 extends Vue {
  async retry() {
    try {
      await this.$store.dispatch('user/getCurrentUser')
    } catch (e) { }
    if (this.$store.getters['user/loggedIn']) {
      this.$router.replace({ name: 'Home' })
    }
  }

  protected render() {
    return (
      <ErrorPage title="401" type={401} desc="请先登录">
        <el-button slot="actions" on-click={this.retry}>
          刷新
        </el-button>
      </ErrorPage>
    )
  }
}
