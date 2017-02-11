var app=getApp();

var $=require('../../utils/util.js');

Page({
	data:{
		workplace:'',
		jobList:[],
		animationData:{},
		handleHeight:'',
		active:['#353535','#353535','#353535'],
		citycidx:[],
		hidden:[false,false,false],
		value:[1000],
		jobName:' '
	},
	onShow:function(){  //这里用es6的箭头函数 this是window
		this.setData({
			workplace:app.globalData.workplace
		})

		//获取城市区县
		$.getDistrictByCityName(this.data.workplace,app.globalData.cityList,this);

		var res = wx.getSystemInfoSync();
		this.setData({
			handleHeight:res.windowHeight-48-38,
		})

		setTimeout(function(){
			if(this.data.jobName===' '){
				this.setData({
					jobName:''
				})
			}
		}.bind(this),500)
	},
	handleAnimate:function(e){
		const index=e.target.dataset.index;
		if(index==1){
			this.setData({
				hidden:[false,true,true],
				active:['#888888','#353535','#353535'],
			})
		}else if(index==2){
			this.setData({
				hidden:[true,false,true],
				active:['#353535','#888888','#353535']
			})
		}else{
			this.setData({
				hidden:[true,true,false],
				active:['#353535','#353535','#888888']
			})
		}
		this.animate1();
	},
	animate1:function(){
		//create animation
		var animation = wx.createAnimation({
		  	duration: 400
		})
		
		if(this.data.hidden[0] || this.data.hidden[1] || this.data.hidden[2]){
			animation.top(0).step();
		}else{
			animation.top(-300).step();
		}
		this.setData({
			animationData:animation.export()
		})
	},
	hideHandle:function(){
		this.setData({
			hidden:[false,false,false],
			active:['#353535','#353535','#353535']
		})
		this.animate1();
	},
	goBack:()=>{
		wx.navigateBack({
  			delta: 1
		})
	},
	toChooseWorkPlace:()=>{
		wx.navigateTo({
			url:'../workplace/workplace'
		})
	},
	toSearch:function(e){
		// wx.navigateTo({
		// 	url:'../searchResult/searchResult?jobName='+this.data.jobName
		// })
		// wx.request({
		// 	url:''
		// })
		this.setData({
			jobName:e.detail.value
		})
	},
	complementSearch:function(e){
		this.setData({
			jobName:e.target.dataset.complement
		})
		console.log(e.target.dataset.complement);
	},
	keyInput:function(e){
		this.setData({
			jobName:e.detail.value
		})
	}
})




// const date = new Date()
// const years = []
// const months = []
// const days = []

// for (let i = 1990; i <= date.getFullYear(); i++) {
//   years.push(i)
// }

// for (let i = 1 ; i <= 12; i++) {
//   months.push(i)
// }

// for (let i = 1 ; i <= 31; i++) {
//   days.push(i)
// }

// Page({
//   data: {
//     years: years,
//     year: date.getFullYear(),
//     months: months,
//     month: 2,
//     days: days,
//     day: 2,
//     year: date.getFullYear(),
//     value: [9999, 1, 1],
//   },
//   bindChange: function(e) {
//     const val = e.detail.value
//     this.setData({
//       year: this.data.years[val[0]],
//       month: this.data.months[val[1]],
//       day: this.data.days[val[2]]
//     })
//   }
// })