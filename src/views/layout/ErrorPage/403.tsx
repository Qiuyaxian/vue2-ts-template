import { Component, Vue } from 'vue-property-decorator'
import ErrorPage from './ErrorPage'

@Component
export default class ErrorPage403 extends Vue {
  protected render() {
    const $router = this.$router
    return (
      <ErrorPage type={'403'}>
        <el-button slot="actions" class="button" onClick={() => $router.go(-1)}>返回</el-button>
      </ErrorPage>
    )
  }
}
