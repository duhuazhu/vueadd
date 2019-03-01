// 获取地址栏中用户输入的关键字
var keyword = getParamsByUrl(location.href, "keyword");

$(function() {
  /*
		根据用户输入的关键字获取搜索结果

			1.获取到地址栏中用户输入的搜索关键字
			2.用关键字去调取搜索接口
			3.将搜索结果展示在页面中

	*/

  mui.init({
    pullRefresh: {
      container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up: {
        height: 50, //可选.默认50.触发上拉加载拖动距离
        auto: true, //可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: "没有更多数据了", //可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  // callback 页面一上来的时候 会自动调用一次
  // 当页面上拉到底部时 还会继续调用

  /*
		按照价格对商品进行排序

			1.对价格按钮添加轻敲事件
			2.将价格排序规则传递到接口中
			3.对之前的各种配置进行初始化
				清空页面中的数据
				恢复当前页的值为1
				重新开启上拉加载
			4.将排序后的结果重新展示在页面中
	*/
});

/**
 * 获取地址栏中的参数
 * @param  {string} url 地址字符串
 * @param  {string} name 要获取的参数名称
 * @return {string}     参数名称对应的参数值
 */
function getParamsByUrl(url, name) {
  var params = url.substr(url.indexOf("?") + 1);
  var param = params.split("&");
  for (var i = 0; i < param.length; i++) {
    var current = param[i].split("=");
    if (current[0] == name) {
      return current[1];
    }
  }
  return null;
}

function getData() {
  var  This=this;
  $.ajax({
    url: "/product/queryProduct",
    type: "get",
    data: {
      page: 1,
      pageSize: 6,
      proName: keyword
    },
   success:function(result){
     console.log(result);
      var html = template("searchTpl", result);
      console.log(html)
      $("#search-box").html(html);
       This.endPullupToRefresh(false);
   }

  });
}
