import { Component, Vue } from 'vue-property-decorator'
import ErrorPage from './ErrorPage'

@Component
export default class ErrorPage404 extends Vue {
  protected render() {
    const $router = this.$router
    return (
      <ErrorPage
        {...{
          props: {
            type: '404'
          }
        }}
      >
        <el-button slot="actions" class="button" on-click={() => $router.go(-1)}>
          返回
        </el-button>
      </ErrorPage>
    )
  }
}
