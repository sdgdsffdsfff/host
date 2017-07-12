document.addEventListener('DOMContentLoaded', function () {
	chrome.runtime.getBackgroundPage(function(backgroundWindow){
		// 获取 background.js 的 backgroundWindow 对象
		var backgroundWindow = backgroundWindow;
		var popup = {
			init: function() {
				// 获取需要用到的dom
				this.business = document.querySelector('#business');
				this.caseWrap = document.querySelector('#case');
				this.caseList = document.querySelector('#caseList');
				this.blank = document.querySelector('#blank');
				this.blankTxt = document.querySelector('#blankTxt');
				this.confirm = document.querySelector('#confirm');
				this.aotu = document.querySelector('#gotoAotu');
				this.about = document.querySelector('#gotoAbout');
				// 初始化操作
				this.selectedId = '';
				this.curCaseId = '';
				this.getCurBusiness();
				this.gotoOtherPage();
			},
			// 设置当前选中方案
			showCurCase: function() {
				this.curCaseId = backgroundWindow.curCaseData.caseArr[0].id;
				this.selectedId = backgroundWindow.curCaseData.caseArr[0].id;
				var caseList = this.caseList.querySelectorAll('.o2host_case_item');
				for (var i = 0; i < caseList.length; i++) {
					var caseItem = caseList[i];
					caseItem.classList.remove('o2host_case_item_active')
					if(this.curCaseId == caseItem.getAttribute('data-id')) {
						caseItem.classList.add('o2host_case_item_active')
						break
					} 
				}
			},
			// 获取当前业务信息
			getCurBusiness: function(){
				var _this = this;
				backgroundWindow.getCurBusiness(function(){
					_this.showCurBusiness(backgroundWindow.curBusinessData);
					_this.showCurCase();
				})
			},
			// 显示当前业务信息
			showCurBusiness: function(curBusinessData){
				this.caseWrap.classList.remove('o2host_case_isLoading')
				if(curBusinessData.caseArr) {
					if(curBusinessData.caseArr.length > 0) {
						this.business.innerHTML = '“' + curBusinessData.business.name + '”'
						var domString = '';
						for(var i = 0; i < curBusinessData.caseArr.length; i++){
							var item = curBusinessData.caseArr[i];
							domString += '<label class="o2host_case_item" data-id='+ item.id + '><h4 class="o2host_case_item_name">'+ item.name +'</h4><div class="o2host_case_item_intro">'+ item.intro +'</div></label>'
						}
						this.caseList.innerHTML = domString;
						this.bindEvents();
					} else {
						this.caseWrap.classList.add('o2host_case_isBlank');
						this.business.innerHTML = '“' + curBusinessData.business.name + '”'
						this.blankTxt.innerHTML = '该业务暂无 Host 配置';
					}
				} else {
					this.caseWrap.classList.add('o2host_case_isBlank');
				}
			},
			// 事件绑定
			bindEvents: function() {
				var _this = this;
				var caseList = _this.caseList.querySelectorAll('.o2host_case_item');
				for (var i = 0; i < caseList.length; i++) {
					var caseItem = caseList[i];
					caseItem.addEventListener('click', function(){
						for (var n = 0; n < caseList.length; n++) {
							caseList[n].classList.remove('o2host_case_item_active')
						}
						if(_this.selectedId != this.getAttribute('data-id')) {
							this.classList.add('o2host_case_item_active')
							_this.selectedId = this.getAttribute('data-id')
						} else {
							_this.selectedId = ''
						}
					})
				}
				_this.confirm.addEventListener('click', function() {
					_this.confirmCallback()
				})
			},
			confirmCallback: function(){
				var _this = this;
				backgroundWindow.getCurCase(_this.selectedId, function(){
					chrome.tabs.reload()
				})
			},
			gotoOtherPage: function() {
				var aotuUrl = 'https://aotu.io/';
				this.aotu.addEventListener('click', function () {
					chrome.tabs.create({
						url: aotuUrl
					})
				})
				var aboutUrl = 'http://host.qiang.it/about/?id=host';
				this.about.addEventListener('click', function () {
					chrome.tabs.create({
						url: aboutUrl
					})
				})
			}
		}
		// 初始化 popup 逻辑
		if (backgroundWindow.init) {
			popup.init();
		} else {
			backgroundWindow.bgInit(function(){
				popup.init();
			})
		}
	})
})
