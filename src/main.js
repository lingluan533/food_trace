import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import SIdentify from './components/page/Identify';    //自定义组件
import "babel-polyfill";
import {default as Web3} from '../node_modules/web3';
import ecommerce_store_artifacts from '../build/contracts/Food.json';
import contract from 'truffle-contract';

Vue.component("SIdentify",SIdentify);
Vue.use(ElementUI);

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
      console.log('Web3 injected browser: OK.')
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      console.log('链接本地节点***')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      console.log(window.web3.currentProvider)

    }
// Vue.use(axios);
//使用truffle-contract 中间件来操作合约 相当于在web3.js的基础上进行了封装操作 因此不能参照web3.js的文档进行开发了 应该参照truffle-contract的文档进行开发
const Food = contract(ecommerce_store_artifacts);

console.log(window.web3.currentProvider)
Food.setProvider(window.web3.currentProvider);
Food.deployed().then((instance)=>{
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
})


});
