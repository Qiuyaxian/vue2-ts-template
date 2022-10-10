import { Component, Vue } from 'vue-property-decorator'
import ErrorPage from './ErrorPage'

@Component
export default class ErrorPage500 extends Vue {
  protected render() {
    const $router = this.$router
    return (
      <ErrorPage type={'500'}>
        <el-button slot="actions" class="button" on-click={() => $router.go(-1)}>返回</el-button>
      </ErrorPage>
    )
  }
}
