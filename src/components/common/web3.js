// import Web3 from "../../../node_modules/web3"
// export default {
//   install: function (Vue, options) {
//     var web3Provider;
//     if(window.ethereum){
//         web3Provider = window.ethereum;
//         try {
//             //請求用戶授權
//             //不用同步的方式 metamask8.0+
//             window.ethereum.enable();
//         } catch (error) {
//             console.log("用戶不同意授權");
//         }

//     }else if(window.web3){//針對老版本的metamask
//         web3Provider = window.web3.currentProvider;

//     }else{
        
//        //否则就连接到给出节点
   
//        web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      
//     }
//   web3 = new Web3(web3Provider);
//     // var web3 = window.web3
//     // if (typeof web3 !== 'undefined') {




//     //   web3 = new Web3(web3.currentProvider)
//     // } else {
//     //   web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
//     // }
   
//     Vue.prototype.$web3 = web3
//   }
// }