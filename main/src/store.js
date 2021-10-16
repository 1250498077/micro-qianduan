import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
 
export default new Vuex.Store({
    state:{
        visible: 0
    },
    mutations:{
        // 保存当前菜单栏的路径
        change(state, payload) {
            console.log('卧槽')
            state.visible = payload.visible;
        },
    }
})
