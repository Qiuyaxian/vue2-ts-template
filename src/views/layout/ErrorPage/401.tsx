import { Component, Vue } from 'vue-property-decorator'
import ErrorPage from './ErrorPage'

@Component({
  // components: { ErrorPage },
  /* eslint-diabeld */
  beforeRouteEnter(to: any, from: any, next: Function) {
    next(async (vm: any) => {
      if (vm.$store.getters['auth/loggedIn']) {
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
      await this.$store.dispatch('auth/init')
    } catch (e) {}
    if (this.$store.getters['auth/loggedIn']) {
      this.$router.replace({ name: 'Home' })
    }
  }

  protected render() {
    return (
      <ErrorPage title="401" type={401} desc="请先登录">
        <button slot="actions" class="button" on-click="retry">
          刷新
        </button>
      </ErrorPage>
    )
  }
}
