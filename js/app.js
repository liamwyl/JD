$(function() {

	/*
	 1. 鼠标移入显示,移出隐藏
	 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
	 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
	 3. 输入搜索关键字, 列表显示匹配的结果
	 4. 点击显示或者隐藏更多的分享图标
	 5. 鼠标移入移出切换地址的显示隐藏
	 6. 点击切换地址tab

	 7. 鼠标移入移出切换显示迷你购物车
	 8. 点击切换产品选项 (商品详情等显示出来)

	 9. 点击向右/左, 移动当前展示商品的小图片
	 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
	 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
	 */

	/*
	1. 对哪个/些元素绑定什么监听?
	2. 对哪个/些元素进行什么DOM操作?
	 */

	// 1. 鼠标移入显示,移出隐藏
	// 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
	$('[name=show_hide]').hover(function() { //显示
		var id = $(this).attr('id') + '_items'
		$("#" + id).show()
	}, function() { //隐藏
		var id = $(this).attr('id') + '_items'
		$("#" + id).hide()
	})



	// 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
	$('#category_items').children(':first').hover(function() {
		$('.cate_item>.sub_cate_box').eq(0).css({
			'display': 'block'
		})
	}, function() {
		$('.cate_item>.sub_cate_box').eq(0).css({
			'display': 'none'
		})
	})

	$('.cate_item').eq(1).hover(function() {
		$('.cate_item>.sub_cate_box').eq(1).css({
			'display': 'block'
		})
	}, function() {
		$('.cate_item>.sub_cate_box').eq(1).css({
			'display': 'none'
		})
	})




	// 3. 输入搜索关键字, 列表显示匹配的结果
	// $('#txtSearch').focus(function(){

	// }).keyup(function(){

	// })

	// focus可以通过鼠标点击触发   keyup键入 
	$('#txtSearch').on('focus keyup', function() {
			var result = $('#txtSearch').val()
			// 如果输入框中有值
			if (result) {
				$('#search_helper').show()
			}
		})
		// blur事件会在元素失去焦点的时候触发
		.blur(function() {
			$('#search_helper').hide()
		})





	// 4. 点击显示或者隐藏更多的分享图标

	// 定义一个Boolean值 用于是否打开或者关闭
	var isOpen = false //标识当前状态为关闭

	$('#shareMore').on('click', function() {

		if (isOpen) { //当前打开=>>去关闭
			isOpen = false

			// 给他的子元素添加一个class属性
			$(this).children(':first').removeClass('backword')

			// 修改#dd的从宽度
			$('#dd').css({
				'width': '155px',
				'background': '',
				'opacity': 1
			})
			// 将隐藏的内容展现出来
			$('.share_kaixin').hide()
			$('.share_douban').css('display', 'none')
		} else { //当前关闭=>>去打开
			isOpen = true

			// 给他的子元素添加一个class属性
			$(this).children(':first').addClass('backword')

			// 修改#dd的从宽度
			$('#dd').css({
				'width': '200px',
				'background': 'red',
				'opacity': 0.5
			})
			// 将隐藏的内容展现出来
			$('.share_kaixin').css('display', 'block')
			$('.share_douban').css('display', 'block')
		}
		// isOpen = !isOpen
	})





	// 5. 鼠标移入移出切换地址的显示隐藏
	var uls = $('#store_content').children(':not(:first)')

	$('#store_select').hover(function() {
			$(this).children(':not(:first)').show()
			$(this).children(':not(:first)').children().eq(2).hide()
			$(this).children(':not(:first)').children().eq(3).hide()

		}, function() {
			// $('#store_content').hide()
			$(this).children(':not(:first)').hide()
		}) // 点击叉号关闭窗口
		.children(':last').click(function() {
			$(this).hide()
			$(this).prevAll().eq(0).hide()
		})


	$('#store_tabs').children().click(function() {
		var index = $(this).index()
		console.log(index)
		console.log(uls.eq(index).children().children().html())
		uls.hide()
		uls.eq(index).show()
		// uls.eq(index).
	})







	// 6. 点击切换地址tab
	var lis = $('#store_tabs').children()
	lis.click(function() {
		// 先将所有的class='hover' 属性全部删除
		lis.removeClass('hover')
		// 点击哪个就将其添加class='hover'属性
		$(this).attr('class', 'hover')


	})








	// 7. 鼠标移入移出切换显示迷你购物车
	$('#minicart').hover(function() {
		$(this).attr('class', 'minicart')
		$(this).children('div').css('display', 'block')
		//$(this).children('div').show()
	}, function() {
		$(this).attr('class', '')
		$(this).children('div').css('display', 'none')
	})







	// 8. 点击切换产品选项 (商品详情等显示出来)

	var $lis = $('#product_detail>ul').children()
	// 获取内容地址
	var $contents = $('#product_detail').children('div:not(:first)')
	$lis.click(function() {
		// 隐藏所有的class属性
		$lis.removeClass('current')
		//  对应添加所有的class属性
		$(this).addClass('current')
		// 获取当前的index
		var index = $(this).index()

		// $contents.css('display','none')
		// $contents.eq(index).css('display','block')

		// $contents.attr('style',"display:none")
		// $contents.eq(index).attr('style',"display:block")

		// 隐藏所有的contents
		$contents.hide()
		$contents.eq(index).show()

	})









	// 9. 点击向右/左, 移动当前展示商品的小图片


	//获取方向箭头
	var $allA = $('#preview').children('h1').children('a')
	// 一次可以看5张图片
	var SHOW_COUNT = 5
	// 获取ul
	var $ul = $('#icon_list')
	// 图片总数量
	var imgCount = $ul.children('li').length
	// 移动次数（向右为正，向左为负）
	var moveCount = 0
	// li的宽度
	var liWith = $ul.children('li:first').width()
	// 左
	var $left = $allA.eq(0)
	// 右
	var $right = $allA.eq(1)

	// 初始化更新
	if (imgCount > SHOW_COUNT) {
		$right.attr('class', 'forward')
	}

	// 右点击监听
	$right.on('click', function() {
		// 判断图片是否可以移动,如果不需要直接结束
		if (moveCount === imgCount - SHOW_COUNT) {
			return
		}
		moveCount++
		// 更新向左按钮
		$left.attr('class', 'backward')
		// 更新向右按钮
		if (moveCount === imgCount - SHOW_COUNT) {
			$right.attr('class', 'forward_disabled')
		}
		// 移动图片
		$ul.css({
			'left': -moveCount * liWith
		})

	})

	// 向左点击监听
	$left.click(function() {
		// 判断图片是否可以移动,如果不需要直接结束
		if (moveCount === 0) {
			return
		}
		moveCount--
		// 更新向右按钮
		$right.attr('class', 'forward')
		// 更新向左按钮
		if (moveCount === 0) {
			$left.attr('class', 'backward_disabled')
		}
		// 移动图片
		$ul.css({
			'left': -moveCount * liWith
		})
	})




	// 10. 当鼠标悬停在某个小图上,在上方显示对应的中图

	// 获取图片
	var $lis = $ul.children()



	// 第一种
	// $lis.hover(function() {
	// 	$lis.children().removeClass()
	// 	// 原生
	// 	this.children[0].className='hoveredThumb'
	// 	// jQuery
	// 	// $(this).children().addClass('hoveredThumb')
	// 	if ($(this).index() >= 4) {
	// 		$('#medimImgContainer').children(':first').attr('src', 'images\\products\\product-s' + ($(
	// 			this).index() - 3) + '-m.jpg')

	// 	} else if ($(this).index() < 4) {
	// 		$('#medimImgContainer').children(':first').attr('src', 'images\\products\\product-s' + ($(
	// 			this).index() + 1) + '-m.jpg')
	// 	}

	// }, function() {
	// 	$lis.children().removeClass()
	// })




	// 第二种
	$lis.hover(function() {
		$lis.children().removeClass()
		// 添加外部红边框
		$(this).children().addClass('hoveredThumb')
		// 显示对应的中图片
		var src = $(this).children().attr('src').replace('.jpg', '-m.jpg')
		$('#medimImgContainer').children(':first').attr('src', src)

	}, function() {
		$lis.children().removeClass()
	})



	// 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
	var $mediumImg = $('#mediumImg')
	var $maskTop = $('#maskTop')
	var $mask = $('#mask')

	// 获取对应的大图地址
	var $largeImg = $('#largeImg')

	// 获取加载中状态图
	var $loading = $('#loading')
	// 大图外部框
	var $largeImgContainer = $('#largeImgContainer')
	var maskWidth = $mask.width()
	var maskHight = $mask.height()
	var maskTopWidth = $maskTop.width()
	var maskTopHight = $maskTop.height()


	$('#medimImgContainer').hover(function() { //鼠标移入
		// 小黄块显示
		$mask.show()

		//------动态加载对应的大图

		// 获取大图地址
		// 中型图片地址  $('#mediumImg').attr('src')
		var largeImgsrc = $('#mediumImg').attr('src').replace('-m', '-l')
		$largeImg.attr('src', largeImgsrc)

		// 大图外部框显示
		$largeImgContainer.show()
		// 绑定加载完成的监听
		$largeImg.on('load', function() { //大图加载完成  'load'===>>'onload'  文档加载

			// 大图的宽高
			var largeImgWidth = $largeImg.width()
			var largeImgHight = $largeImg.height()

			// 给$largeImgContainer设置尺寸
			$largeImgContainer.css({
				'width': largeImgWidth / 2,
				'height': largeImgHight / 2
			})
			// 显示大图
			$largeImg.show()
			// 隐藏加载进度条
			$loading.hide()



			$maskTop.mousemove(function(event) {
				// 事件坐标（鼠标坐标）
				var eventX = event.offsetX
				var eventY = event.offsetY

				var left = 0
				var top = 0

				//计算黄块的 left top 
				left = eventX - maskWidth / 2
				top = eventY - maskHight / 2

				// 判断小黄块的可移动区域
				// 左右
				if (left < 0) {
					left = 0
				} else if (left > maskTopWidth - maskWidth) {
					left = maskTopWidth - maskWidth
				}
				// 上下
				if (top < 0) {
					top = 0
				} else if (top > maskTopHight - maskHight) {
					top = maskTopHight - maskHight
				}


				// 更新小黄块的left top
				$mask.css({
					'left': left,
					'top': top
				})


				// 移动大图
				// 得到大图的坐标
				left = -left * largeImgWidth / maskTopWidth
				top = -top * largeImgHight / maskTopHight
				// 设置大图的坐标
				$largeImg.css({
					'left': left,
					'top': top
				})


			})

		})















	}, function() { //鼠标移出
		$mask.hide()
		$largeImgContainer.hide()
		$largeImg.hide()

	})


































}) //$
