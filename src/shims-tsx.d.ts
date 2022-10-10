/* eslint-disable */
import Vue, { VNode } from 'vue'
/* eslint-enabled */

declare global {
  namespace JSX {
    /* eslint-disable */
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    /* eslint-enabled */
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
