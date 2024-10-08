/*
 * @Date: 2024-09-18 16:11:58
 * @LastEditTime: 2024-09-25 10:20:23
 * @Description: 错误监控信息处理、上报
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/plugins/web-error-report.ts
 */

import { ErrorReportType,StackType } from "../type/index";
import TraceKit from "tracekit";
import { getCurrentTime } from "../utils/tools";



/*
错误捕获主类（在项目入口文件 main.js中使用）
必须接收一个 Vue实例
上报reportApi
*/
export class ErrorReport {
  options;
  reportApi; // 错误上报接口
  vueExample; // vue实例
  packingMethod; // 打包方式
  constructor(options: ErrorReportType) {
    this.options = options;
    // "/sem/sourcemap/img?data=";
    this.reportApi = options.reportApi;
    this.vueExample = options.vue;
    this.packingMethod = options.packingMethod;
    console.log("项目分类---", options.module);
    this.init();
  }

  init() {
    this.formatErrorInfo();
    this.vueErrorHandler();
    this.resourceErrorHandler();
  }

  /**
   * @description: 使用TraceKit工具对错误信息统一格式化后上报
   * @return {*}
   */
  formatErrorInfo() {
    TraceKit.report.subscribe((errorReport) => {
      console.log("TraceKit格式化后错误信息=", errorReport);
      const { message, stack } = errorReport || {};
      if (!stack?.length || !message) {
        console.log("没有stack信息、不使用TraceKit处理错误。");
        return false;
      }
      // 收集需要的堆栈信息
      const stacks: StackType = {
        column: stack[0].column,
        line: stack[0].line,
        url: stack[0].url,
        func: stack[0].func, // 调用函数
      };
      // vue、js错误
      const datas = formatErrorDatas(this.packingMethod ,3, message, stacks);
      // 上报
      this.reportViaImg(datas);
    });
  }

  /**
   * @description: 通过img方式进行错误信息上报
   * @param {*} datas
   * @return {*}
   */
  reportViaImg(datas) {
    const img = new Image(1, 1);
    const url = this.reportApi; // 错误上报接口
    img.src = url + JSON.stringify(datas);
  }

  // vue框架错误监听, 使用try让错误不在控制台显示，因为要交给TraceKit处理
  vueErrorHandler() {
    this.vueExample.config.errorHandler = function (err, vm, info) {
      try {
        console.log("-----vue-error", err, vm, info);
        // 使用TraceKit处理错误
        TraceKit.report(err);
      } catch (e) {
        console.error("vue-errorHandler错误：", e);
      }
    };
  }

  async resourceStatus(imageUrl) {
    try {
      const res = await fetch(imageUrl);
      return {
        status: res.status,
        statusText: res.statusText,
      };
    } catch (error) {
      console.error("fetct请求资源，错误捕获：", error);
    }
  }

  // 资源加载异常监听（img、css、js）
  // resourceErrorHandler() {
  //   // window.addEventListener('error', (msg, url, row, col, error) => {
  //   window.addEventListener(
  //     "error",
  //     async (event) => {
  //       if (event.target && (event.target?.src || event.target?.href)) {
  //         console.log("-----js-资源错误", event);
  //         // 获取到加载失败的资源地址
  //         const url = event.target.src || event.target.href;
  //         // TODO 资源重新请求后获取状态信息、但是会发送一次http请求，不推荐
  //         // const status = await this.resourceStatus(url)
  //         const baseURI = event.target?.baseURI || ""; // 如果是图片 event.target.baseURI 是访问路径
  //         const parsedUrl = new URL(url);
  //         // 资源错误时，获取当前资源的一些信息
  //         const obj = {
  //           // ...status,
  //           resourceType: event.target?.type || event.target?.localName, // 资源类型
  //           url, // 错误资源完整路径
  //           origin: parsedUrl.origin,
  //           path: parsedUrl.pathname, // 资源文件名
  //           // baseURI: baseURI, //  当前访问的页面完整url路径 包含了#号 node接收会报错
  //           routePath: baseURI.split("#")[1], // 具体路由路径
  //         };
  //         const msg = `资源错误:在[${obj.routePath}]路由中发现,值为[${obj.path}]`;
  //         // 上报资源错误数据
  //         reportViaImg(formatErrorDatas(2, msg, obj));
  //       } else {
  //         console.log("非资源加载错误", event);
  //       }
  //     },
  //     true
  //   );
  // }

  resourceErrorHandler() {
    window.addEventListener(
      "error",
      async (event: ErrorEvent) => {
        const target = event.target as HTMLElement; // 类型断言
        let url: string | undefined;
        // 类型保护，确保我们正确地访问 src 和 href
        if (target instanceof HTMLImageElement) {
          url = target.src; // 访问 img 的 src 属性
        } else if (target instanceof HTMLAnchorElement) {
          url = target.href; // 访问 a 的 href 属性
        }
        if (url) {
          console.log("-----js-资源错误", event);
          const baseURI = target.baseURI || ""; // 获取基础 URI
          const parsedUrl = new URL(url); // 解析 URL

          // 构建资源错误对象
          const obj = this.createResourceErrorObject(
            target,
            parsedUrl,
            baseURI,
            url
          );

          const msg = `资源错误:在[${obj.routePath}]路由中发现,值为[${obj.path}]`;

          // 上报资源错误数据
          this.reportViaImg(formatErrorDatas(this.packingMethod,2, msg, obj));
        } else {
          console.log("非资源加载错误", event);
        }
      },
      true
    );
  }

  // 辅助函数：创建资源错误对象
  private createResourceErrorObject(
    target: HTMLElement,
    parsedUrl: URL,
    baseURI: string,
    url: string
  ) {
    return {
      resourceType:
        target instanceof HTMLImageElement ? "img" : target.localName, // 资源类型
      url, // 错误资源完整路径
      origin: parsedUrl.origin,
      path: parsedUrl.pathname, // 资源文件名
      routePath: baseURI.split("#")[1] || "", // 具体路由路径
    };
  }

  // js执行错误监听
  jsError() {
    window.onerror = (msg, url, line, col, error) => {
      console.log("js-执行错误");
      console.log(
        "🚀🚀 ~ file: errorReport.js:173 ~ jsError ~ msg, url, line, col, error:",
        msg,
        url,
        line,
        col,
        error
      );
      // TraceKit.report(error)
      // try {
      //   this.level = ErrorLevelEnum.WARN;
      //   this.category = ErrorCategoryEnum.JS_ERROR;
      //   this.msg = msg;
      //   this.url = url;
      //   this.line = line;
      //   this.col = col;
      //   this.errorObj = error;
      //   this.recordError();
      // } catch (error) {
      //   console.log("js错误异常", error);
      // }
    };
  }

  // 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件。
  promiseError() {
    window.addEventListener(
      "unhandledrejection",
      (event) => {
        console.log("promise错误：", event);
      },
      true
    );
  }
}





/**
 * @description: 格式化错误信息
 * @param {*} type
 * @param {*} message
 * @param {*} stack
 * @return {*}
 */
export function formatErrorDatas(packingMethod, type, message, stack) {
  const errorTypes = {
    1: "jsError",
    2: "resourceError",
    3: "vueError",
    4: "httpError",
  };
  const obj = {
    packingMethod, // 打包方式
    errorType: errorTypes[type],
    message,
    stack,
    date: getCurrentTime(),
  };
  return obj;
}

export default {
  ErrorReport,
};
