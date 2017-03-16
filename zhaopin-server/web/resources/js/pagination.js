
//js分页
//el:分页容器 count:总记录数 pageStep:每页显示多少个 pageNum:第几页 fnGo:分页跳转函数
var jsPage = function(el, count, pageStep, pageNum, fnGo) {
	this.getLink = function(fnGo, index, pageNum, text) {
		var s = '<a href="#p' + index + '"onclick="' + fnGo + '(' + index + ');" ';
		if (index == pageNum) {
			s += 'class="aCur" ';
		}
		text = text || index;
		if(text=='Prev'){
			s += 'class='+text+'>&lt;&lt;' + text + '</a> ';
		}else if(text=='Next'){
			s += 'class='+text+'>' + text + '&gt;&gt;</a> ';
		}else{
			s += 'class='+text+'>' + text + '</a> ';
		}
		return s;
	}

	//0页
	if(count==0){
		$(el).html('');
		return;
	}
	//1页
	var pageNumAll = Math.ceil(count / pageStep);
	if (pageNumAll == 1) {
		$(el).html('');
		return;
	}
	var itemNum = 2; //当前页左右两边显示个数
	pageNum = Math.max(pageNum, 1);
	pageNum = Math.min(pageNum, pageNumAll); //比如还有80页，输入81页
	var s = '';
	if (pageNum > 1) {
		s += this.getLink(fnGo, pageNum - 1, pageNum, 'Prev');
	//	console.log(s + '\n');
	} else {
		s += '<span class=prev>&lt;&lt;Prev</span> ';
	}
	var begin = 1;
	if (pageNum - itemNum > 1&&pageNumAll!=4) {
		s += this.getLink(fnGo, 1, pageNum) + '... ';
		begin = pageNum - itemNum;
	//	console.log(s + '\n');
	}
	var end;
	if (begin == 1) {
		end = Math.min(pageNumAll, begin + itemNum + 1);
	} else {
		end = Math.min(pageNumAll, begin + itemNum * 2);
	}
	if (end == pageNumAll - 1) {
		end = pageNumAll;
	}
	for (var i = begin; i <= end; i++) {
		s += this.getLink(fnGo, i, pageNum);
	//	console.log(s + '\n');
	}
	if (end < pageNumAll) {
		s += '... ' + this.getLink(fnGo, pageNumAll, pageNum);
	//	console.log(s + '\n');
	}
	if (pageNum < pageNumAll) {
		s += this.getLink(fnGo, pageNum + 1, pageNum, 'Next');
	//	console.log(s + '\n');
	} else {
		s += '<span class=next>Next&gt;&gt;</span> ';
	}
	$(el).html(s);
}
