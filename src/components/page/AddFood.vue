<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> 个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>修改用户</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		
		<div class="userContent">

	 

			<el-form ref="form" :model="form"  label-width="80px">
				
				<el-form-item prop="foodName" label="食品名称">
					<el-input v-model="form.foodName" ></el-input>
				</el-form-item>
				<el-form-item prop="productDate" label="生产日期">
					<el-col :span="24">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.productDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item prop="exp" label="保质期">
					<el-input v-model="form.exp" placeholder="请输入商品保质期"></el-input>
				</el-form-item>
				<el-form-item prop="manufacturer" label="生产厂商">
					<el-input v-model="form.manufacturer" placeholder="请输入生产厂商"></el-input>
				</el-form-item>
				<el-form-item prop="advicePrice" label="建议零售价格">
					<el-input v-model="form.advicePrice" placeholder="请输入建议零售价格"></el-input>
				</el-form-item>
                <el-form-item prop="serialNumber" label="流水批次号">
					<el-input v-model="form.serialNumber" placeholder="请输入流水批次号"></el-input>
				</el-form-item>
				<!-- <el-upload 
   class="upload-demo" 
   action="" 
   ref="upload" 
   :auto-upload="true" 
   :before-upload="onBefore"
   accept="image/jpeg,image/gif,image/png,image/bmp"
   multiple> -->
<!--    
  </el-upload> -->
				<el-form-item>
					<el-button type="primary" @click="uploadFood('form')">确定</el-button>
					<el-button @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	const ipfsAPI = require('ipfs-api')
	import Util from '../../utils/utils';
	import {default as Web3} from '../../../node_modules/web3';
import ecommerce_store_artifacts from '../../../build/contracts/Food.json';
import contract from 'truffle-contract';
//使用truffle-contract 中间件来操作合约 相当于在web3.js的基础上进行了封装操作 因此不能参照web3.js的文档进行开发了 应该参照truffle-contract的文档进行开发
var Food = contract(ecommerce_store_artifacts);
var web3;
console.log(Food)
Food.setProvider(window.web3.currentProvider)
	export default {
		data() {
            return {
				current_account:'',
				web3:'',
				blockchainId:'',
				form: {
					//blockchainId:'',
					foodName: 'ggg',					
					productDate: '',
					exp: '20',
					manufacturer: 'ggg',
					advicePrice: '23',
					serialNumber: '110',
					imgHash:'wew',
					status:'0',
					
			
				},
				
			}
        },
        methods:{
			upload2ipfs(render){
        let that = this
		// connect to ipfs daemon API server
		console.log("我晒",render.result)
var ipfs = ipfsAPI({host: '127.0.0.1', port: '5001', protocol: 'http'});
console.log(ipfs)
        let buffer = Buffer.from(render.result);
        ipfs.add(buffer).then((response) => {
           resolve(response[0].hash);
        }).catch((err) => {
            console.error(err)
            //reject(err);
        })
    },
    onBefore(file){
        let that = this
		//let filename = window.URL.createObjectURL(file)
		var ipfs = ipfsAPI({host: '127.0.0.1', port: '5001', protocol: 'http'});
        let render = new FileReader()
        render.readAsDataURL(file)
        render.onload = function () {
            that.upload2ipfs(render)
        }
        return false
    },
        	getUserData() {
				const self = this;	
				let username = sessionStorage.getItem('ms_user').name;			
				self.$http.get('/api/user/getUser',{name: username}).then(function(response) {
					console.log(response);
					let result = response.data[0];
					self.form.name = result.username;
					self.form.account = result.account;
					self.form.email = result.email;
					self.form.phone = result.phone;
					self.form.card = result.card;
					self.form.birth = new Date(result.birth);
					self.form.sex = result.sex;
					sessionStorage.setItem('ms_userId', result.id);
				}).then(function(error) {
					console.log(error);
				})
			},

			saveImageOnIpfs(){
    		return new Promise((resolve, reject)=>{
        let buffer = Buffer.from(reader.result);
        ipfs.add(buffer).then(res=>{
            console.log("res: ", res);
            resolve(res[0].hash);
        }).catch(err=>{
            console.error(err);
            reject(err);
        });
    });
},	
async  getCurrent_account(){
          window.web3.eth.getAccounts((error,accounts)=>{
            current_account = accounts[0];
            console.log("非metamask 8.0+獲取賬號：",current_account);
        });
},		
async uploadFood(formName) {
	const self = this;			
    console.log("前端傳來的參數: ", this.form.foodName);
	
	Food.setProvider(window.web3.currentProvider);
    await Food.deployed().then(i=>{
       // getCurrent_account();
        try{
			/*
			foodName: '',					
					productDate: '',
					exp: '',
					manufacturer: '',
					advicePrice: '',
					serialNumber: '',
					imgHash:''
			*/
            //由于truffle-contract 在方法调用的返回信息中已经将事件的返回包含进去了，所以我们不必再自行对事件进行监听了。大大简化了开发效率
            console.log(this.form.productDate)
            i.addFoodToStore(this.form.foodName, this.form.productDate, this.form.exp, this.form.manufacturer, this.form.advicePrice, this.form.serialNumber,0,this.form.imgHash, {from: '0xfdf45267060b4082c39fec8fce3fa448741cdb0f'})
            .then(res=>{
                console.log("结果：",res)
				self.blockchainId = parseInt(res["logs"][0]["args"]["_FoodIndex"]);
				
				console.log("添加成功：",parseInt(self.blockchainId))
				//console.log(this.form)
				//插入mysql数据库
                        this.$http.post('/api/food/addFood',{
							blockchainId:self.blockchainId,
							foodName:this.form.foodName,
							productDate:this.form.productDate,
							exp:this.form.exp, 
							manufacturer:this.form.manufacturer,
							advicePrice:this.form.advicePrice,
							serialNumber:this.form.serialNumber,
							imgHash:this.form.imgHash,
							status:0
							}).then(function(response) {
							console.log(response);
							self.$router.push('/register-success');
						}).then(function(error) {
							console.log(error);
						})
                        return i;
                    });
              
        }catch(err){
            console.log(err)
        }
    });
   	},
        	onCancle() {
        		 this.$router.push('/userCenter');
        	}       	
		},
		//初始化
		created() {

		}  
	}
</script>

<style>
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
	.select-sex {
		width: 320px;
	}
</style>