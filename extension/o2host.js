var o2host = {
	init: function(){
		this.getCurCaseData();
		// this.bindMessageEvent();
		// this.host = window.location.host;
		// chrome.runtime.sendMessage({init: o2host.host})
	},
	// 判断当前URL是否所选业务
	// isBusinessUrl: function(data){
	// 	if (!data.caseArr){
	// 		return
	// 	}
	// 	var urlList = data.business.urlList;
	// 	var _this = this;
	// 	for (var i = 0; i < urlList.length; i++) {	
	// 		if(urlList[i].url == this.host) {
	// 			_this.showCurData(data);
	// 		}
	// 	}
	// },
	// 获取curCaseData
	getCurCaseData: function(){
		var _this = this;
		chrome.runtime.sendMessage(
			{ data: 'curCaseData' }, 
			function(response) {
				// console.log(response)
		    // _this.isBusinessUrl(response)
		    response.caseArr && _this.showCurData(response)
	    }
		)
	},
	// 在页面中显示当前host情况
	showCurData: function(data){
		console.log(data)
		// 在页面中插入提示结构
		var cur = document.createElement('div');
		cur.setAttribute('class','o2host_cur');
		cur.setAttribute('id','o2host_cur');
		cur.innerHTML = '<div class="o2host_cur_main"><i class="o2host_cur_icon"></i><span class="o2host_cur_tit">当前的 Host 设置：</span><span class="o2host_cur_ctn"></span></div><a href="javascript:;" class="o2host_cur_close">&times;</a>';
		document.body.appendChild(cur)
		this.bindCloseEvent();
		$cur = document.querySelector('#o2host_cur');
		var $curContent = $cur.querySelector('.o2host_cur_ctn');
		var caseDom = '';
		var caseItem = data.caseArr[0];
		$curContent.innerHTML = '“' + data.business.name + '”业务，“' + caseItem.name + '”方案';
	},
	// 通信监听
	// bindMessageEvent: function(){
	// 	var _this = this;
	// 	console.log('bindMessageEvent111')
	// 	chrome.runtime.onMessage.addListener(
	//   	function(request, sender, sendResponse) {
	//   		console.log(request)
	// 	    if (request.select) {
	// 	    	location.reload();
	// 	    }
	// 	    if (request.domain) {
	// 	    	sendResponse(_this.host);
	// 	    }
	//     }
	// 	)
	// },
	// 浮层关闭监听
	bindCloseEvent: function(){
		document.querySelector('.o2host_cur_close').addEventListener('click', function(){
			document.querySelector('#o2host_cur').style.display = 'none';
		})
	}
}
o2host.init();