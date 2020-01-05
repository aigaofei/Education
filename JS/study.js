/* 
    @author = 王冠雄
    @time = 2019/x/xx
    @project = study_project 
    @Last Modified by:   王冠雄
    @Last Modified time: 2019-xx-xx 
 */

// <script src = "./jquery-3.4.1.js"></script>
// import "./jquery-3.4.1.js"
 /*import 'jquery-ui.min.js' 
 import 'bootstrap.min.js' 
 import 'jquery.easing.1.3.js' */
// 导航栏课程内容的动态生成


var allList = {};
var str ='';
var classlists = ['小学课程' , '初中课程' , '高中课程' , '少儿英语' , '英语口语' , '高考压轴'];
var len = classlists.length;
$.each(classlists, function(i,item){
	str += '<li><a href="">'+ item +"</a></li>";
})
allList['les'] = str;
$('.navbar .clasty>ul').append(allList.les).hide();

$('.navbar .clasty').mouseover(function(){
	  $('.clasty>ul').css({
	  "padding":10,
	  "display": 'block',
		"position": "absolute",
		"left": 64,
		"top": 45,
	}).stop().slideDown(200,function(){
		var liHeight = $('.clasty>ul>li').height();
		console.log(len);
		console.log(len*liHeight);
		 $('.clasty ul').stop().show().height(len*liHeight + 'px').css('backgroundColor','#f3f5f7');
	  }).mouseover(function(){
			 $('.clasty>ul>li>a').stop().hover(function(){
			 	$(this).css('color','red');
			 },function(){
			 	$(this).css('color','');
			 });
			});
}).stop().mouseout(function(){
	$('.clasty>ul').stop().slideUp(200);
});
// .css({'width':35,'height':(len+2)*liHeight,'backgroundColor':'red'}).stop().
// 顶部收索栏
var html = '<ul>';

$('.search #tpl').hide();
$(".search>form>input:eq(0)").css({'color':'gray','opacity':0.7}).focus(function(){
	console.log($(this).val());
	$(this).val('').css('color','green');
	$('.search>form>input:eq(0)').keyup(function(){
		var timer = null;
		// console.log($(this).val().length);
		clearTimeout(timer);
	   if($(this).val().length == 0){
			$('.search #tpl').slideUp(100);
			// console.log($('.search #tpl').html());
			$('.search #tpl').html('');
			// console.log($('.search #tpl').html(''));
			html = '';
			return;
		}
		timer = setTimeout(function(){
			$.ajax({
				url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
				data: {'wd':$('.search>form>input:eq(0)').val()},
				dataType: 'jsonp',
				jsonp:'cb',
				success: function(data){
					console.log('成功了');
					// console.log(data);
					var data = data.s;
					// console.log(data);
					$.each(data, function(i,item){
						html+= '<li>'+item+'</li>';
					})
					html+= '</ul>';
					$('.search #tpl').stop().slideDown(100).html(html);
					$('.search #tpl>ul>li').css({'text-decoration':'none','padding':6});
					html = '';
				},
				error: function(data){
					console.log('失败了');
					// console.log(data);
				},
			})
		},300);
	})
}).blur(function(){
	$(this).val('请输入关键词');
	$('.search #tpl').slideUp(100).children('ul').remove();
	html = '';
});


var img = ['images/2.jpg','images/banner_03.jpg'];
console.log(img[0]+'-----'+img[1]);
var cout = 0;

// 登陆退出全局遮罩
 
$(".personal #cancel").click(function(){
	$('.fullcover').css({display : 'block'});
	
});
$('.fullcover').find('span').mouseover(function(){
	$(this).css({'backgroundColor':'red','color':'#fff','cursor':'pointer'});
}).mouseout(function(){
	$(this).css({'backgroundColor':'','color':''});
})
$('.fullcover .inner>span:eq(1)').click(function(){
	$('.personal #username').text($(".personal #username").text()).css('color','#00a4ff');
	$(this).parents('.fullcover').css('display' ,'none');
})
$('.fullcover .inner>span:eq(0)').click(function(){
	$('.personal #username').text('登录请点我').css('color','#00a4ff');
	$(this).parents('.fullcover').css('display' ,'none');
	$('#cancel').text('')
})

// 点击登录按钮获取和替换登录信息
$('.personal #username').click(function(){
	console.log($(this).text());
	if($(this).text() === '登录请点我'){
		$('.requestnet').css('display','block');
		$('.requestnet>input[type=text]').val('')
		$('.requestnet>input[type=password]').val('')
	}
	$('.requestnet .inner>input[type=button]').mouseover(function(){
		$(this).css({'backgroundColor':'red' , 'color': 'white'})
	}).click(function(){
		if($('.requestnet .inner>input[type=text]').val() !== '' && $('.requestnet .inner>input[type=password]').val() !== ''){
			$('.personal #username').text($('.requestnet .inner>input[type=text]').val())
			$('.personal #username').prepend('<img src="images/tou_03.png" >')
			$('.requestnet').css('display','none');
			$('#cancel').text('退出')
		}
		// $('.personal #username').text('登录请点我')

	}).mouseout(function(){
		$(this).css({'backgroundColor':'#fff' , 'color': 'red'})
	})
})
$('.requestnet .inner .icom').click(function(){
	$('.requestnet').css('display','none');
})



// 1 用于测试的轮播图路径的
/*console.log($('.banner-in>img')[0].src);
$('.banner-in>img')[0].src = "web/"+img[cout];
console.log($('.banner-in>img')[0].src);
$('.banner-in>img')[0].src = '/work_project/Education_project/web/'+img[cout];
console.log($('.banner-in>img')[0].src);*/
// http://localhost/work_project/Education_project/web/images/2.jpg    正确的路径
// 2 下面是背景轮播的办法
// $('.banner-in')[0].style.background = "url(http://localhost/work_project/Education_project/web/images/2.jpg)";
// console.log($('.banner-in')[0].style.background);
var timm = '';
timee();
function timee(){
	timm = setInterval(function(){
		var lee = img.length;
		if(cout > (lee-1)){
			cout = 0;
		};
		$('.banner-in>img')[0].src = img[cout];
		// console.log($('.banner-in>img')[0].src);
		// $('.banner-in')[0].style.background = "url(http://localhost/work_project/Education_project/web/"+img[cout]+")";
		// console.log($('.banner-in')[0].style.background);
		$('.banner .circle').find('li').removeClass('current');
		$('.banner .circle>li:eq('+cout+')').addClass('current');
		cout +=1;
	},3000);
}
$('.banner-in>img').mouseover(function(){
	clearInterval(timm);
	timm = '';
}).mouseout(function(){
	timee();
});

// banner部分左侧栏经过时状态
$('.slidebar>ul>li').each(function(i,item){
	$(this).attr('i',i);
	/*console.log(i);
	console.log($(this)[0]); console.log($(item)[0]); 这是获取每一项
	console.log($(this).attr('i'));   获取每一项的索引属性*/
})
var j = 0;
$('.banner .slidebar').find('li').mouseover(function(event){
	$(this).css('color','sync')
	var j = $(this).attr('i');
	console.log('所在位置的索引'+j);
	console.log($(this).height()*j);
	console.log((j*($(this).height())+4));/*'鼠标所在位置的总高度'+*/    
	// document.styleSheets[0].insertRule('.slidec::before { width: 600px }', 0);  是在设置伪元素的属性
	$('.slidebar>ul>span').css({
			'width':'600px',
			'height':'46px',
			'top':($(this).height()*j+4),
			'left': '195px',
			'background-color': '#f3f5f7',
			'text-align': 'center',
			'line-height': '45px',
			'color': 'gray',
			'position': 'absolute'
	}).stop().fadeIn(400,function(){
		$('.slidebar>ul>span').css('display','block')
	})
}).mouseout(function(){
	$(this).css('color','')
	$('.slidebar>ul>span').stop().fadeOut(400,function(){
		$('.slidebar>ul>span').css('display','none')
	})
})

// // 底部滚动轮播新闻栏kaishi-1
// var car = $('.carousel');
// var imgw = $('.carousel').find('img').width();
// console.log(imgw);
// var imgl = $('.carousel').find('ul').length;
// console.log(imgl);
// var postp = 0;           /*已经过去的长度*/
// var postnub = 0;   			 /*已经过去的个数*/
// var currentp = 0;				 /*鼠标点击时的位置*/
// var indexul = 0;					/*点击次数*/
// var currentposition = 0;
// var leftxul = 0;				/*左边的点击次数*/
// var leftnub = 0;				/*左边的经过次数*/
// $('.Cfather>span').mouseover(function(){

// 	$('.carousel')[0].style.animationPlayState="paused";
// console.log('当前的索引位置---/ '+postnub);
// 		$('.carousel')[0].style.left = 0+'px';
// console.log('进入的偏移----/ '+$('.carousel')[0].style.left);
// console.log($('.carousel').offset().left-336);
// 	$('.tright').click(function(){
// 		// $('.carousel').offset({left: -currentnub*(imgw+20)});
// 		// postp = $('.carousel').offset({left: 0});
// 		console.log('进入的偏移----/ '+$('.carousel')[0].style.left);
// 	    postp = $('.carousel').offset().left-336;
// 		console.log('进入的偏移----/ '+postp);
// 		// 获取所在位置的index值
// 		$('.carousel>ul').each(function(i,item){
// 			$(item).attr('index',i);
// 			// var itemdex = $(item).attr('index');   /*是获取每一项的序号*/
// 		});
// 		postnub = Math.ceil(Math.abs(postp)/(imgw+20));
// 		// console.log('当前的索引位置---/ '+postnub);
// 		$(this).attr('index',postnub);
// 		// console.log($(this));
// 		// console.log('当前的span获得的索引值-----/ '+$(this).attr('index'));
// 		// indexul = currentnub;
// 		// if(postnub <= 6){
// 			postnub ++;indexul++;
// 		// }
// 		console.log('当前的索引位置---/ '+postnub);
// 		console.log('当前的span获得的索引值-----/ '+$(this).attr('index'));
// 		if(postnub >= 7){
// 			postnub = 1;
// 			indexul = 1;
// 			$('.carousel')[0].style.left = -postnub*(imgw+20)+'px';
// 			// $('.carousel').offset({left: -postnub*(imgw+20)});
// 			currentp = $('.carousel')[0].style.left;
// 			console.log('进入超出范围后第一次--偏移----/ '+currentp);  /*519*/
// 			console.log('当前超出范围的----索引位置---/ '+postnub);
// 			console.log('当前超出范围的----索引位置---/ '+indexul);
// 			postp = $('.carousel').offset().left;
// 			console.log('进入超出范围的offset偏移----/ '+postp);

// 		}
		
// 		var leftp = $('.carousel')[0].style.left = -indexul*(imgw+20)+'px';
// 		// $('.carousel')[0].style.left =-(imgw+20)+'px';
// 		currentp = postp + parseInt(leftp);
// 		console.log('右击后总postp+leftp的偏移----/ '+currentp);
// 		currentposition = $('.carousel').offset().left-336;
// 		console.log('右击后总的--offset--偏移----/ '+currentposition);
		
// 	});
// /*}).mouseout(function(){
// 	$('.carousel')[0].style.animationPlayState="running";
// 	// $(this).off('click');
// 	// postnub = 0;
// 	indexul = 0;
// });*/

// /*1、此功能一定要注意分清打印出来的 offset().left偏移值是否包含style.left的偏移值  
// 结果是包括的;  2、 务必要搞清执行逻辑 和条件判断  3、offset是只读属性不能设置，
// 设置偏移只能通过 style.left ; 4、要适当清除缓存（逻辑没问题前提下）*/

// /*$('.Cfather>span:eq(0)').mouseover(function(){

// 	$('.carousel')[0].style.animationPlayState="paused";*/

// 	$('.tleft').on('click',function(){
// 		$('.carousel')[0].style.left = 0+'px';
// 		postp = $('.carousel').offset().left-336;
// 		console.log('进入的偏移----/ '+postp);
// 		// 获取所在位置的index值
// 		$('.carousel>ul').each(function(i,item){
// 			$(item).attr('index',i);
// 		});
// 		leftnub = Math.ceil(Math.abs(postp)/(imgw+20));
// 		// console.log('当前的索引位置---/ '+leftnub);
// 		$(this).attr('index',leftnub);
// 		console.log('-起初的索引位置---/ '+leftnub);
// 		console.log('-起初的span获得的索引值-----/ '+$(this).attr('index'));
// 		if(leftnub<=6 && leftnub>0){
// 			leftxul = leftnub;
// 		}
// 		leftnub--;leftxul--;
// 		console.log('--实际的索引位置---/ '+leftnub);
// 		if(leftnub <= 0){
// 			leftnub = 5;
// 			leftxul = 5;
// 			$('.carousel')[0].style.left = -leftnub*(imgw+20) +'px';
// 			currentp = $('.carousel')[0].style.left;
// 			console.log('进入超出范围后第一次--偏移----/ '+currentp);  /*519*/
// 			console.log('当前超出范围的----索引位置---/ '+leftnub);
// 			postp = $('.carousel').offset().left-336;
// 			console.log('进入超出范围的offset偏移----/ '+postp);
// 		}
		
// 		console.log(leftxul);
// 		var leftp = $('.carousel')[0].style.left = -leftxul*(imgw+20)+'px';
// 		console.log('左击后总leftp的偏移----/ '+leftp);
// 		currentposition = $('.carousel').offset().left-336;
// 		console.log('左击后总的--offset--偏移----/ '+currentposition);
// 	})

// }).mouseout(function(){
// 	$('.carousel')[0].style.animationPlayState="running";
// 	// $(this).off('click');
// 	indexul = 0;
// 	// postnub = 0;
// });
// $('.Cfather .cover').mouseover(function(){
// 	$('.carousel')[0].style.animationPlayState="paused";
// }).mouseout(function(){
// 	$('.carousel')[0].style.animationPlayState="running";
// })


// // 底部滚动轮播新闻栏kaishi-1
// var car = $('.carousel');
// var imgw = $('.carousel').find('img').width();
// console.log(imgw);
// var imgl = $('.carousel').find('ul').length;
// console.log(imgl);
// var postp = 0;           /*已经过去的长度*/
// var postnub = 0;   			 /*已经过去的个数*/
// var currentp = 0;				 /*鼠标点击时的位置*/
// var currentnub = 0;			/*鼠标点击时经过的个数*/
// var indexul = 0;					/*点击次数*/

// // console.log(imgl);
// $('.Cfather>span').mouseover(function(){
// 	$('.carousel')[0].style.animationPlayState="paused";
// 	  postp = $('.carousel').offset().left-336;
// 		console.log('进入的偏移----/ '+postp);
// 		// 获取所在位置的index值
// 		$('.carousel>ul').each(function(i,item){
// 			$(item).attr('index',i);
// 			// console.log(i);
// 			// console.log($(item).index());
// 			// var itemdex = $(item).attr('index');   /*是获取每一项的序号*/
// 		});
		
// 		postnub = Math.ceil(Math.abs(postp)/(imgw+20));
// 		console.log('当前的索引位置---/ '+postnub);
// 		$(this).attr('index',postnub);
// 		// console.log($(this));
// 		console.log('当前的span获得的索引值-----/ '+$(this).attr('index'));
//   currentnub = $(this).attr('index');
	
// 	$('.tright').on('click',function(){
// 		// indexul = currentnub;
// 		indexul++;
// 		currentnub++;
// 		if(currentnub === 8){
// 			currentnub = 2;
// 			indexul = 2;
// 			$('.carousel')[0].style.left = currentnub*(imgw+20);
// 			$('.carousel').offset({left: -currentnub*(imgw+20)});
// 			currentp = $('.carousel')[0].style.left;
// 			console.log('进入的偏移----/ '+currentp);  /*519*/
// 			console.log('当前的索引位置---/ '+currentnub);
// 			postp = $('.carousel').offset().left;
// 			console.log('进入的偏移----/ '+postp);
// 		}
// 		// else if(currentnub === 9){
// 		// 	currentnub = 4;
// 		// 	$('.carousel')[0].style.left = -4*(imgw+20) +'px';
// 		// 	currentp = $('.carousel')[0].style.left;
// 		// 	console.log('进入的偏移----/ '+currentp);
// 		// 	console.log('当前的索引位置---/ '+currentnub);
// 		// }
		
// 		 var leftp = $('.carousel')[0].style.left = -indexul*(imgw+20)+'px';
// 		// $('.carousel')[0].style.left =-(imgw+20)+'px';
// 		currentp = postp + parseInt(leftp);
// 		console.log('进入的偏移----/ '+currentp);
// 		// currentp = $('.carousel').offset().left-postp;
// 		// console.log('进入的偏移----/ '+currentp);
// 		var nub = Math.ceil(Math.abs(currentp)/(imgw+20));
// 		console.log('当前的索引位置------------nub/ '+nub);
// 		console.log('当前的索引位置-----currentnub/ '+currentnub);
// 	})

// 	$('.tleft').on('click',function(){
// 		currentnub--;
// 		if(currentnub === 0 || currentnub === 1){
// 			$('.carousel')[0].style.left = 6*imgw +'px';
// 			console.log(Math.abs($('.carousel').offset().left));
// 			currentnub = 6;
// 		}
// 		console.log(Math.abs($('.carousel').offset().left));
// 		// $('.carousel')[0].style.left =-indexul*(imgw+20)+'px';
// 		$('.carousel')[0].style.left =-(currentnub*imgw)+'px';
// 	})

// }).mouseout(function(){
// 	$('.carousel')[0].style.animationPlayState="running";
// 	$(this).off('click');
// 	indexul = 0;
// });





// 底部滚动轮播新闻栏kaishi
var car = $('.carousel');
// car.append($('.carousel>ul:first-child').clone(true));
// car.prepend($('.carousel>ul:nth-of-type(6)').clone(true));
var imgw = $('.carousel').find('img').width();
// console.log(imgw);
var imgl = $('.carousel').find('ul').length;
// console.log(imgl);
// console.log($('.carousel'));
var carw = $('.carousel').width((imgw+20)*imgl);
var carwidth = $('.carousel').width();
// $('.carousel').get(0).insertBefore($('.carousel>ul:nth-of-type(6)').clone(true),$('.carousel>ul:first-child'));
// console.log($('.carousel').width());
var indexul = 0;
var borcar = '';
// bor();

// $('.news .tright').mouseover(function(){
// 	$(this).click(function(){
// 		indexul ++;
// 		$('.carousel').css({'translateX':(-indexul*(imgw+20))});
// 		$('.carousel').css({'transition':'translateX 1000 ease'});
// 		// $('.carousel')[0].style.-webkit-transform({'Left':(-indexul*(imgw+20))});
// 		// console.log($('.carousel')[0].style.mozTransform);
// 		// console.log($('.carousel')[0].style.webkit-transform);
// 		console.log(indexul);
// 	})
// })














function bor(){
	borcar = setInterval(function(){
		// $('.carousel')[0].style.left = -indexul*(imgw+20) + 'px';
		// console.log(indexul);
		// $('.carousel').animate({carw:'(-indexul*imgl)+px'},function(){
		// 	console.log(indexul);
		if(indexul === 7){
		 	// clearInterval(borcar);
			// $('.carousel')[0].style.left = -2*(imgw+20) + 'px';
			indexul = 1;
			// bor();
			// clearInterval(borcar);
		} ;			
		// });
		$('.carousel')[0].style.left = -indexul*(imgw+20) + 'px';
		indexul+=1;
		console.log(indexul);
	},1500);
};
// 底部footer的鼠标经过样式设置
$('footer .ft-r').find('a').mouseover(function(){
	$(this).css('color','#00a4bb')
}).mouseout(function(){
	$(this).css('color','')
})



// jQuery1102045397737728814747_1574299734774({"q":"java","p":false,"g":[{"type":"sug","sa":"s_1","q":"java学习"},{"type":"sug","sa":"s_2","q":"java学习路线"},{"type":"sug","sa":"s_3","q":"javascript学习指南"}],"slid":"4605773585528957832"})
	// header('Access-Control-Allow-Origin:*'),
	// header('Access-Control-Allow-Methods:HEAD,GET,POST,OPTIONS,PATCH,PUT,DELETE'),
	// header('Access-Control-Allow-Headers:Origin,X-Requested-With,Authorization,Content-Type,Accept,Z-Key'),
// https://sp1.baidu.com/8qUJcD3n0sgCo2Kml5_Y_D3/v.gif?pid=201&pj=www&pj_name=es_sug&es_sug_hot=0&es_sug_num=1&eb_sug_num=0&es_sug_bp=0_1&path=https%3A%2F%2Fwww.baidu.com%2F&wd=&rsv_sid=&rsv_did=7ab577ea734de85407491af3a46d3364&t=1574299911509

// https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1461,21081,29567,29220&wd=JavaScript&req=2&bs=sublime%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%BF%AB%E6%8D%B7%E9%94%AE&pbs=sublime%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%BF%AB%E6%8D%B7%E9%94%AE&csor=10&cb=jQuery110205951112122875755_1574303573052&_=1574303573103

// https://www.baidu.com/s?ie=utf-8&newi=1&mod=11&isbd=1&isid=811f2926000142fe&wd=javas&rsv_spt=1&rsv_iqid=0xb0d2537f0000672d&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=0&rsv_dl=tb&oq=sublime%25E6%25A0%25BC%25E5%25BC%258F%25E5%258C%2596%25E5%25BF%25AB%25E6%258D%25B7%25E9%2594%25AE&rsv_t=e7fd%2Fh2VgEp4eXjqYuDVOsCtM%2Fav5Tuv%2BMRWR%2FXlMDAKgQB3jbM8yjgbQ1vaWnehechj&rsv_pq=811f2926000142fe&inputT=306786&rsv_sug3=60&rsv_sug1=71&rsv_sug7=101&bs=sublime%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%BF%AB%E6%8D%B7%E9%94%AE&rsv_sid=1461_21081_29567_29220&_ss=1&clist=&hsug=&csor=5&pstg=5&_cr1=43682

// https://sp1.baidu.com/8qUJcD3n0sgCo2Kml5_Y_D3/v.gif?pid=201&pj=www&pj_name=es_sug&es_sug_hot=0&es_sug_num=1&eb_sug_num=0&es_sug_bp=0_1&path=https%3A%2F%2Fwww.baidu.com%2Fs%3Fie%3Dutf-8%26f%3D8%26rsv_bp%3D1%26tn%3Dmonline_7_dg%26wd%3Dphp%26oq%3Djavas%26rsv_pq%3D9c03a01e00027e25%26rsv_t%3Daee9KTTCUXB0NY2YBrj2%252BdjMKgO4gGAmVTUzHXVGDOAibIyx3tqAe1UIQRNEWr1Ybron%26rqlang%3Dcn%26rsv_enter%3D1%26rsv_dl%3Dtb%26rsv_sug3%3D17%26rsv_sug1%3D26%26rsv_sug7%3D100%26rsv_sug2%3D0%26inputT%3D184049%26rsv_sug4%3D213694&wd=php&rsv_sid=1426_21102_29567_29221&rsv_did=232fc02c5d99d635f7fa5f74db08d024&t=1574325471748

// https://sp3.baidu.com/-0U_dTmfKgQFm2e88IuM_a/ps_fp.htm?pid=ps&fp=undefined&im=undefined&wf=undefined&br=3&qid=fffd8c0c0002331d&bi=C7C4351B546616B3859364AF646117CA:FG=1&psid=C7C4351B546616B3205539C20E70CA2E
// https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=0&di=undefined&imgtype=3&src=undefined&_=1574326616623














