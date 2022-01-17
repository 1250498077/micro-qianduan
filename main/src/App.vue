<template>
  <div id="app">
    <h1 class="vue-title">VUE</h1>
    <img src="./assets/logo.png">
    <h1>REACT</h1>
    <router-link to="/Dog">Dog</router-link>
    <router-link to="/Cat">Cat</router-link>
    <router-view></router-view>
    <br />
    <button v-on:click="editUrl3000">请求'//localhost:3000'</button>
    <button v-on:click="editUrl3001">请求'//localhost:3001'</button>
    <button v-on:click="initApp">加载react16</button>
    <br />
    <!-- <button v-on:click="childrenToFather">清除沙箱</button> -->
    <div>{{store ? store.state.visible : 0}}</div>
    <button v-on:click="childrenToFather">父子组件的通信</button>
    <button v-on:click="openModal1">modal1</button>
    <button v-on:click="openModal2">modal2</button>
    child
    <div>============================以下都是react==============================</div>
    <div id="root"></div>
  </div>
</template>

<script>
import './index.css';
// 快照沙箱
import { SnapShotSandbox } from './snapShotSandbox'
// 代理沙箱
import { ProxySandbox } from './proxySandbox'
// 子应用
let common = {};
let vueComponentObj = {};
const fetchResource = (url) => {
  return fetch(url).then(async (res) => {
    return await res.text()
  })
};
const getResource = async (root, url) => {
  const scriptUrl = [];
  const cssUrl = [];
  const script = [];
  const dom = root.outerHTML

  function deepParse(element) {
    const children = element.children;
    const parent = element.parent;

    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src');
      if (!src) {
        script.push(element.outerHTML)
      } else {
        if (src.startsWith('http')) {
          scriptUrl.push(src)
        } else {
          scriptUrl.push(`http:${url}${src}`)
        }
      }

      if (parent) {
        parent.replaceChild(document.createComment('此js文件已经被微前端替换'))
      }
    }


    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href');
      if (href.endsWith('.js')) {
        if (href.startsWith('http')) {
          scriptUrl.push(href)
        } else {
          scriptUrl.push(`http:${url}${href}`)
        }
      }
      // if (href.endsWith('.css')) {
      //   console.log('加载css')
      //   if (href.startsWith('http')) {
      //     cssUrl.push(href)
      //   } else {
      //     cssUrl.push(`http:${url}${href}`)
      //   }
      // }
    }

    for (let i = 0; i < children.length; i++) {
      deepParse(children[i])
    }

  }
  deepParse(root)
  return [dom, scriptUrl, script]
}

// 执行子应用的js字符
const performScriptForFunction = (script, global) => {
  window.proxy = global;
  const scriptText = `
    return ((window) => {
      ${script}
      return window['react16']
    })(window.proxy)
  `;
  return new Function(scriptText)()
}

const performScriptForEval = (script, global) => {
  const scriptText = `
    () => {
      ${script}
      return window['react16']
    }
  `;
  return eval(scriptText).call(global, global)
}
let child = {};
import store from './store'
export default {
  name: 'App',
  components: {},
  data: () => {
    return {
      componentObj: {},
      url: '//localhost:3000'
    }
  },
  mounted: async function () {
    // this.initApp()
  },
  methods: {
    editUrl3000: () => {
      this.url = '//localhost:3000'
    },
    editUrl3001: () => {
      this.url = '//localhost:3002'
    },
    initApp: async () => {
      window.__MICRO_WEB__ = true;
      // 子应用的所有js字符
      let allScript = [];
      /* 创建一个沙箱：有些子应用有挂载的全局变量，我们在渲染
        子应用的时候要准备好那些全局变量，同时暂存下主应用的全局变量
        当渲染子应用卸载的时候，我们要恢复现场，所以沙箱在这里是为了
        恢复现场用的 */
      common.proxy = new ProxySandbox();


      // 拿到子应用的index.html
      const html = await fetchResource(this.url);
      // 创建一个装载子应用的index.html的div
      const div = document.createElement('div');
      // 拿到的字符含有<html>、<header>、<body>标签,插入进去之后浏览器会自动帮助我们删除
      div.innerHTML = html;


      // 解析刚刚拿到的子应用的div
      // scriptUrl： 拿到子应用的所有依赖的js文件的url
      // script： 拿到子应用的内嵌的js逻辑
      const [dom, scriptUrl, script, cssUrl] = await getResource(div, this.url);
      console.log('scriptUrl', scriptUrl)
      // // 拿到子应用的 index.html 的外链的js
      // const cssFetchedResource = await Promise.all(cssUrl.map(async (item) => {
      //   return fetchResource(item);
      // }));

      // 拿到子应用的 index.html 的外链的js
      const fetchedResource = await Promise.all(scriptUrl.map(async (item) => {
        return fetchResource(item);
      }));
      // 拼合子应用的 index.html 的内联js和外链js
      allScript = script.concat(fetchedResource);
      console.log('allScript', allScript)
      // 执行子应用的javascript
      allScript.forEach(item => {
        const life = performScriptForFunction(item, common.proxy.proxy);
        if (life && life.mount) {
          child = life;
          this.setModalType = life.setModalType
          // 将父组件方法传递到子组件，子组件可以借此向父组件传递信息
          life.mount({
            childrenToFather: this.childrenToFather
          });
        }
      });
    },
    clearSandBox: () => {
      common.proxy.inactive();
    },
    childrenToFather: function () {
      this.$store.commit({
        type: 'change',
        visible: store.state.visible + 1
      })
    },
    reactContainer: function(type, props = {
      handleOk: () => {},
      handleCancel: () => {},
      componentLoadCallback: () => {}
    }) {
      console.log('vueComponentObj', vueComponentObj)
      if (vueComponentObj && vueComponentObj.componentObj && vueComponentObj.type === type) {
         vueComponentObj.componentObj.showModal(true);
      } else {
        child.setModalType(type, {
          handleOk: props.handleOk,
          handleCancel: props.handleCancel,
          componentLoadCallback: props.componentLoadCallback
        });
      }
    },
    openModal1: function() {
      this.reactContainer('Modal1', {
        handleOk: () => {  vueComponentObj.componentObj.closeModal() },
        handleCancel: () => { vueComponentObj.componentObj.closeModal() },
        componentLoadCallback: (componentObj) => {
          vueComponentObj = {
            componentObj: componentObj,
            type: 'Modal1'
          }; 
          vueComponentObj.componentObj.showModal(true);
        }
      })
    },
    openModal2: function() {
      child.setModalType('Modal2', {
        handleOk: () => { vueComponentObj.closeModal() },
        handleCancel: () => { vueComponentObj.closeModal() },
        componentLoadCallback: (componentObj) => { 
          vueComponentObj = componentObj;
          vueComponentObj.showModal(true);
        }
      })
    }
  },

}
</script>

<style>

/* css样式隔离方案 */
/* css module webpack打包的时候提供的一种方式 */
/* shadow dom */
/* minicss */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> 
