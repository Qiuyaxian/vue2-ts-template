import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

// 声明全局的 window ，不然使用 window.XX 时会报错
// declare var window: Window;
// declare var document: document;
 
// declare module "element-ui/lib/transitions/collapse-transition";
// declare module "element-ui";