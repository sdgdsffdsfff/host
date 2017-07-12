// 公用数据与方法

// 存储数据
var storageData = [];

// 当前domain
var curDomain = '';

// 当前url
var curUrl = '';

// init标记
var init = false;

// 当前方案数据
var curCaseData = {};
// {
// 	business: {
// 		id: '',
// 		name: ''
// 	},
// 	caseArr: [
// 		{
// 			id: '',
// 			name: '',
//			hostList: ''
// 		}
// 	]
// }

// 当前业务数据
var curBusinessData = {};
// {
// 	business: {
// 		id: '',
// 		name: '',
// 		urlList: []
// 	},
// 	caseArr: [
// 		{
// 			id: '',
// 			name: '',
//			intro: '',
// 			hostList: [],
//			selected: ''
// 		}
// 	]
// }

// 所有业务数据
var businessData = [];
// [
// 	{
// 		id: '',
// 		name: '',
// 		urlList: []	
// 	}
// ]

var allowedDomain = ['jd.com', 'toplife.com'];
var fullDomain = ['portal.cms.jd.com', 'channel.jd.com'];

// 读取存储数据
function getStorageData(callback) {
	chrome.storage.local.get('proxyData', function(data){
		var caseId = '';
		if(data && data.proxyData) {
			storageData = data.proxyData;
			for (var i = 0; i < storageData.length; i++) {
				var item = storageData[i];
				if (curUrl == item.url) {
					caseId = item.caseId
					break
				}
			}
		}
		getCurCase(caseId, callback)
	})
}

// 存储当前方案
function saveStorageData(callback) {
	var equal = false;
	for(var i = 0; i < storageData.length; i++) {
		var item = storageData[i];
		if (item.url == curUrl) {
			item.caseId = curCaseData.caseArr ? curCaseData.caseArr[0].id : null;
			equal = true;
			break
		}
	}
	if(!equal) {
		storageData.push({
			url: curUrl,
			caseId: curCaseData.caseArr ? curCaseData.caseArr[0].id : null
		})
	}
	chrome.storage.local.set({'proxyData': storageData}, function(data) {
		callback(curCaseData);
	});
}

// 获取Case信息
function getCase(businessId, callback) {
    var Business = AV.Object.createWithoutData('BUSINESS', businessId)
    var businessQuery = new AV.Query('CASE')
    businessQuery.equalTo('business', Business)
    var statusQuery = new AV.Query('CASE')
    statusQuery.equalTo('status', 1)
    var query = AV.Query.and(businessQuery, statusQuery)
    query.find().then(function (results) {
        var hostArr = []
      	results.forEach(function (caseItem) {
        	hostArr.push({
          		id: caseItem.id,
          		name: caseItem.get('name'),
          		intro: caseItem.get('intro')
        	})
      	})
      	curBusinessData.caseArr = hostArr;
      	callback();
    })
}

// 获取当前host信息
function getCurCase(caseId, callback) {
	if(caseId){
		var Case = AV.Object.createWithoutData('CASE', caseId);
		Case.fetch({ include: ['business'] }).then(function (caseItem) {
			if (caseItem.get('status') != 1 ){
		    curCaseData = {};
			} else {
        var business = caseItem.get('business');
        // 当前方案数据格式
       	curCaseData = {
        	business: {
	        	id: business.id,
	        	name: business.get('name'),
	        	urlList: business.get('url'),
        	},
        	caseArr: [
        		{
        			id: caseItem.id,
        			name: caseItem.get('name'),
        			hostList: caseItem.get('host')
        		}
        	]
        }
	    }
			// 设置代理
	    setProxy(callback);
	  })
	} else {
		curCaseData = {}
		// 设置代理
	  setProxy(callback);
	}
}

// 获取所有业务信息
function getBusiness(callback) {
	businessData = [];
	var Business = new AV.Query('BUSINESS');
	Business.equalTo('status', 1);
   	Business.find().then(function(businessList) {
   		for (var i = 0; i < businessList.length; i++) {
   			var item = businessList[i];
        businessData.push({
        	id: item.id,
        	name: item.get('name'),
        	urlList: item.get('url')
        })
    	}
    	checkDomain(callback);
   	})
}

// 获取当前业务信息
function getCurBusiness(callback) {
	getBusiness(function(idx){
		if(idx != null) {
			var business = businessData[idx]
			curBusinessData = {
				business: {
					id: business.id,
					name: business.name,
					urlList: business.urlList
				},
				caseArr: []
			}
			getCase(business.id, function(){
				callback && callback()
			});
		}
		else {
			curBusinessData = {}
			callback && callback()
		}
	})
}

// 获取当前url
function getCurUrl(callback) {
	chrome.tabs.query({
  	active: true,
  	currentWindow: true
	}, function (tabs){
		if (tabs.length > 0) {
			// 获取 url
			var url = tabs[0].url;
	  	// 拆分当前 url
	  	var urlReg =  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;  
			 // ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash']
			var urlArr = urlReg.exec(url);
			if (!urlArr) {
				curDomain = null;
				init = true;
				return
			}
			// 获取当前 domain
			curDomain = urlArr[3];
			// 判断是否业务范围内的域名，获取 curUrl
			var len = allowedDomain.length;
			for(var n = 0; n < len; n++) {
				var fullDomainItem = fullDomain[n];
				if(curDomain == fullDomainItem) {
					curUrl = urlArr[3] + '/' + urlArr[5]
					getStorageData(callback)
					return
				}	
			}
			for(var i = 0; i < len; i++) {
				var allowedDomainItem = allowedDomain[i];
				if(curDomain.indexOf(allowedDomainItem) > -1) {
					curUrl = curDomain
					getStorageData(callback)
					return
				}
			}
			init = true
		}
	})
}

// 检查是否与当前域名匹配
function checkDomain(callback) {
	if(!curUrl) {
		callback && callback(null)
		return
	}
	for (var i = 0; i < businessData.length; i++) {
		var item = businessData[i];
		for (var n = 0; n < item.urlList.length; n++) {
			var url = item.urlList[n].url;
			if ( url == curUrl ) {
				callback && callback(i)
				return
			}
		}
	}
	callback && callback(null)
}

// 设置代理
function setProxy(callback) {
	if(!curCaseData.caseArr) {
		// 系统设置
		var config = {
      mode: 'system'
    }
	} else {
		// 设置Pac信息
		var pacCtn = '';
		curCaseData.caseArr[0].hostList.forEach(function(host) {
			pacCtn = pacCtn + 'if(host == "' + host.domain + '"){\n' +
	                 '	return "PROXY ' + host.ip + '"}\n'
		})
		var config = {
      mode: 'pac_script',
      pacScript: {
        data: 'function FindProxyForURL(url, host) {\n' + pacCtn + '}'
      }
    }
	}
  chrome.proxy.settings.set(
    {value: config, scope: 'regular'},function() {
   		saveStorageData(callback)
    }
  )
}

// 重置	
function bgReset() {
	init = false;
	storageData = [];
	curDomain = '';
	curUrl = '';
	curCaseData = {};
	curBusinessData = {};
	businessData = [];
}

// init操作
function bgInit(callback) {
	bgReset();
	// 获取当前 url，设置curUrl
	// 读取 storage 信息，获取当前 url 的方案设置 caseId
	// 根据 caseId 获取相应的 case 信息 curCaseData
	// 设置 proxy
	// 将当前 url 应用的 caseId 保存到 storage 中
	getCurUrl(function(){
		// 标记初始化完成
		init = true;
		callback && callback();
	})
}

document.addEventListener('DOMContentLoaded', function() {
	// 监听内容脚本 o2host.js 请求
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.data === 'curCaseData'){
			if (init) {
				sendResponse(curCaseData);
			} else {
				bgInit(sendResponse(curCaseData));
			}
    } else {
      sendResponse('error');
    }
	})
	bgInit();
	// 监听当前 tab url 发生变化
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		if (changeInfo.url == undefined) {
      return;
    }
    var url = tab.url;
    if (url != undefined) {
      bgInit();
    }
	})
	// 监听 tab 发生变化
	chrome.tabs.onActivated.addListener(function(){
		bgInit();
	})
})
