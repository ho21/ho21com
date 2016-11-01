/*
*20130516
*apps通用的js
*author san_born@163.com
*
* +---------功能列表-------------.
*加载中提示
*确认操作
*限制字符输入数功能
*固定滚动
*城市的2级联动
*区域打印- QQ.JOBAY.COM.CN
*区域打印- WWW.JOBAY.COM.CN
*收藏职位
*关注公司 - 返回文本
*申请职位
*发送邀请
*移出人才库
*加入人才库
*加入人才库 - 批量
*简历回收站 - 添加
*简历回收站 - 批量添加
*简历回收站 - 还原
*简历回收站 - 批量还原
*简历回收站 - 删除
*简历回收站 - 批量删除
*添加到已入职
*添加到已离职
*添加到已入职 - 批量
*添加到已离职 - 批量
*离职删除 - 批量
*刷新职位
*刷新职位 - 批量
*职位回收站 - 添加
*职位回收站 - 批量添加
*职位回收站 - 永久删除
*职位回收站 - 批量永久删除
*职位屏蔽
*职位激活 
*职位激活- 批量添加
*显示点击的内容 - 邀请面试的记录.
*上传头像
*屏幕上下滚动
*回到旧版本
*弹窗发布职位
*弹窗发布企业资料
*没有图片触发
*部门管理
*简历状态
*简历刷新
*删除简历
*简历放到人才库(下载简历).
*创建,修改求职信.
*弹窗发布简历
*/

//查看邀请.
function look_invitation(id,text)
{
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		$.get(getApps()+'?m=ajax&a=look_invitation',{'id':id},function(data){
		if(data.status===1)  $.dialog(text).lock(true);
		},'json')
	}
}

//弹窗发布简历
function release_resume(id,state)
{
	var w = 600; //宽度
	 //var h = 310;   //高度
	 //var t = (screen.height-h)/2; //离顶部距离
	 var l = (screen.width-w)/2; //离左边距离
	window.open(getApps()+'?m=talent&a=myresume&resume_id='+id+'&close='+state,'','width=800,location=no,scrollbars=yes,titlebar=no,top=10,left='+l)
}

//创建,修改,删除求职信
function talent_recommend_letter(id,type)
{

	if(type=='delete')
	{
		//确认操作
	   if(alert_confirm('确认删除当前求职信?')===false) return false; 
		$.get(getApps()+'?m=ajax&a=talent_recommend_letter',{'id':id,'type':type},function(data){ 
		$.dialog.tips(data.info); 
		if(data.status == 1) window.location.href = window.location.href ;	
		},'json');
	
	}
	else
	{
		$.dialog.open(getApps()+'?m=ajax&a=talent_recommend_letter&id='+id+'&type='+type,{title: '创建,修改,删除求职信',width:'450px' }).lock(true);
	}


}

//简历放到人才库(下载简历).
function download(resume_id) 
{
	if(alert_confirm('确认查看当前简历?')===false) return false; 
	//验证,操作
	if(isNaN(resume_id)){ $.dialog.tips('参数错误'); }
	else
	{	
		$.get(getApps()+"?m=ajax&a=check_bank",{'resume_id':resume_id,'do':'collect'},
		function(data)
		{
			if(data.status==1)
			{
				$.dialog
				({
					title:'查看内容',
					content:data.info,
					ok:function(){ window.location.href=window.location.href; }
				})
			}
			else
			{
				$.dialog
				({
					title:'查看内容',
					content:data.info,
					ok:true
				})
			}
		},"json");
	}
}

//职位竞争力分析
function jzfx(id)
{
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		$.dialog.open(getApps()+'?m=talent&a=jzfx&id='+id,{title: '职位竞争力分析',width:'530px' }).lock(true)
	}
}

//删除简历
function resume_delete(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认删除当前简历?')===false) return false; }

	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');
 		//提交
		$.get(getApps()+'?m=ajax&a=resume_delete',{'id':id},function(data){
				//提示
				$.dialog.tips(data.info);
				if(data.status==1) $(self).parents('tr').fadeOut('normal');
		}) 
	}
}

//简历刷新
function resume_refresh(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认刷新当前简历?')===false) return false; }

	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交
		$.get(getApps()+'?m=ajax&a=resume_refresh',{'id':id},function(data){
 			if(data.status==1)
			{
				//提示
				$.dialog.tips(data.info.msg);
				//更新内容
				$(self).parents('tr').find('.resume_refresh').html(data.info.time);
			}
			else
			{	
				//提示
				$.dialog.tips(data.info);
			}
		}) 
	}

}


//简历状态
function resume_status(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认修改?')===false) return false; }
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交删除
		$.get(getApps()+'?m=ajax&a=resume_status',{'id':id},function(data){
			//更新内容
			if(data.status==1) 
			{
				$(self).html(data.info);
				//提示
				$.dialog.tips('操作成功');
			}
			else
			{
					$(self).html(data.info);
				//提示
				$.dialog.tips('操作成功');
			
			}
		}) 
	}
}
//部门管理
function department_manage(target,id)
{
	$.dialog.open(getApps()+'?m=enterprise&a=department',{title: '部门管理',width:'530px',close:function(){ 
			$(target).load('/apps.php?m=enterprise&a=department&status=true&id='+id); 
	} }).lock(true)
}

/*
 *没有图片触发 - onerror
 *@param shape	  默认正方形- nopic.png
 *@param shape - x 横的长方形 - xnopic.png
 *@param shape - y 竖的长方形 - ynopic.png
 */
function nopic(self,shape)
{	
	//正方形
	if(!shape){ self.src='/public/img/nopic.png'; }
	//横的长方形 - xnopic.png
	if(shape=='x'){ self.src='/public/img/xnopic.png'; }
	//竖的长方形 - ynopic.png
	if(shape=='y'){ self.src='/public/img/ynopic.png'; }
	self.onerror=null;
}
//弹窗发布企业资料
function release_info()
{
	var w = 600; //宽度
	 //var h = 310;   //高度
	 //var t = (screen.height-h)/2; //离顶部距离
	 var l = (screen.width-w)/2; //离左边距离
	window.open(getApps()+'?m=enterprise&a=release_info','','width=700,location=no,scrollbars=yes,titlebar=no,top=10,left='+l)
}

//弹窗发布职位
function release_job(id)
{
	var w = 600; //宽度
	 //var h = 310;   //高度
	 //var t = (screen.height-h)/2; //离顶部距离
	 var l = (screen.width-w)/2; //离左边距离
	window.open(getApps()+'?m=enterprise&a=release_job&id='+id,'','width=600,location=no,scrollbars=yes,titlebar=no,top=10,left='+l)
}

//删除留言
function e_delete_comment(self,id)
{
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{
		if(alert_confirm('确认要删除这条留言?')===false) return false;
		$.get(getApps()+'?m=ajax&a=e_delete_comments',{'id':id},function(data){
		//提示
		$.dialog.tips(data.info);
		//删除
		$(self).parents('li').fadeOut('slow');
		},'json');
	}

}

//回到旧版本
$(function(){
/* str = '<div class="back_old_page">';
str += '<img src="img/back-top.png"  class="back-top" width="25"  style="cursor:pointer"/>';
str += '<br/><br/>';
str += '<img src="img/back-btm.png" class="back-btm" width="25" style="cursor:pointer" />';
str += '</div>';
$(document.body).prepend(str);
$('.back-top').click(function(){ $("html, body").stop().animate({scrollTop: 0},450); })
$('.back-btm').click(function(){ $("html, body").stop().animate({scrollTop: $(document).height()},450); }) */
})


//屏幕上下滚动
$(document).ready(function(){
str = '<div class="roll_div">';
str += '<img src="img/back-top.png"  class="back-top" width="25"  style="cursor:pointer"/>';
str += '<br/><br/>';
str += '<img src="img/back-btm.png" class="back-btm" width="25" style="cursor:pointer" />';
str += '</div>';
$(document.body).prepend(str);
$('.back-top').click(function(){ $("html, body").stop().animate({scrollTop: 0},450); })
$('.back-btm').click(function(){ $("html, body").stop().animate({scrollTop: $(document).height()},450); })
})


//上传头像
function upimg(type)
{
	if(!type) alert('错误类型');
	$.dialog.open(getApps()+'?m=Upload&a=Index&vo='+type,{title: '上传图像',width:'900px',height:'490px'});
}

//显示点击的内容 - 邀请面试的记录.
function show_message(self)
{
	$.dialog({content:'<div style="line-height:20px;">'+$(self).find('span').html()+'</div>',id:'s1',width: '500px',lock:true});
}

//职位激活
function batch_position_activation(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认激活当前职位?')===false) return false; }

	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//显示加载中
	loading('操作中...','3600');
	
 	//提交
	$.get(getApps()+'?m=ajax&a=position_activation',{'id':select_values.substr(2),'ajax':'true'},function(data){
	
		//提示
		$.dialog.tips('激活成功');
		
		//更新内容
		$('input[name='+names+']:checked').each(function(){ 
		$(this).parents('.Apply_tr').find('.recruitment_status').html('招聘中');
		$(this).parents('.Apply_tr').find('.recruitment_start_time').html(data.data);
		$(this).parents('.Apply_tr').find('.recruitment_end_time').html(data.info);
		});
	
	}) 
}

//职位激活
function position_activation(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认激活当前职位?')===false) return false; }

	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交
		$.get(getApps()+'?m=ajax&a=position_activation',{'id':id,'ajax':'true'},function(data){
 			if(data.status==1)
			{
				//提示
				$.dialog.tips('激活成功');
				//更新内容
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_status').html('招聘中');
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_start_time').html(data.data);
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_end_time').html(data.info);
			}
			else
			{	
				//提示
				$.dialog.tips(data.info);
			}
		}) 
	}

}


//职位屏蔽 - 批量添加
function batch_position_shielding(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认屏蔽这些职位?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//显示加载中
	loading('操作中...','3600');
	
	 //提交
	$.get(getApps()+'?m=ajax&a=position_shielding',{'id':select_values.substr(2)},function(data){
	
		//提示
		$.dialog.tips(data.info);
			
		//更新内容
		$('input[name='+names+']:checked').each(function(){ $(this).parents('.Apply_tr').find('.recruitment_status').html('已屏蔽'); });
		
	}) 
}

//职位屏蔽
function position_shielding(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认屏蔽当前职位?')===false) return false; }
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交
		$.get(getApps()+'?m=ajax&a=position_shielding',{'id':id},function(data){
		
			//提示
			$.dialog.tips(data.info);
			
			//更新内容
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_status').html('已屏蔽');
			}
		}) 
	}
}


//还原职位
function position_recover(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认把这职位还原么?')===false) return false; }

	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交
		$.get(getApps()+'?m=ajax&a=position_recover',{'id':id},function(data){
			//提示
			$.dialog.tips(data.info);
			
			//删除层
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		}) 
	}
}

//职位回收站 - 批量永久删除
function batch_position_recover(self,names)
{

	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认把这些职位还原?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//显示加载中
	loading('操作中...','3600');
		
	//提交
	$.get(getApps()+'?m=ajax&a=position_recover',{'id':select_values.substr(2)},function(data){
	
		//提示
		$.dialog.tips(data.info);
		
		//删除层
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
		});	
		
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }	
	})
}



//职位回收站 - 批量永久删除
function batch_position_delete(self,names)
{

	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认把这些职位放进职位回收站?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//显示加载中
	loading('操作中...','3600');
		
	//提交
	$.get(getApps()+'?m=ajax&a=position_delete',{'id':select_values.substr(2)},function(data){
	
		//提示
		$.dialog.tips(data.info);
		
		//删除层
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
		});	
		
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }	
	})
}


//职位回收站 - 永久删除
function position_delete(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认把这职位永久删除么?')===false) return false; }

	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交
		$.get(getApps()+'?m=ajax&a=position_delete',{'id':id},function(data){
			//提示
			$.dialog.tips(data.info);
			
			//删除层
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		}) 
	}
}


//职位回收站 - 批量添加
function batch_position_recycled_add(self,names)
{

	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认把这些职位放进职位回收站?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//显示加载中
	loading('操作中...','3600');
		
	//提交
	$.get(getApps()+'?m=ajax&a=position_recycled_add',{'id':select_values.substr(2)},function(data){
	
		//提示
		$.dialog.tips(data.info);
		
		//删除层
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
		});	
		
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }	
	})
}

//职位回收站 - 添加
function position_recycled_add(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认把这些职位放进职位回收站?')===false) return false; }

	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交
		$.get(getApps()+'?m=ajax&a=position_recycled_add',{'id':id},function(data){
			//提示
			$.dialog.tips(data.info);
			
			//删除层
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		}) 
	}

}

//刷新职位 - 批量
function batch_refresh_position(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认刷新这些职位?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//显示加载中
	loading('操作中...','3600');
		
	//提交删除
	$.get(getApps()+'?m=ajax&a=position_refresh',{'id':select_values.substr(2)},function(data){
	
		//提示
		$.dialog.tips(data.info);
		
		//更新内容
		$('input[name='+names+']:checked').each(function(){ 
			$(this).parents('.Apply_tr').find('.recruitment_status').html('招聘中'); 
			$(this).parents('.Apply_tr').find('.recruitment_end_time').html(data.url);
		});
			
	})
}

//刷新职位
function refresh_position(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认刷新当前职位?')===false) return false; }
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');

 		//提交删除
		$.get(getApps()+'?m=ajax&a=position_refresh',{'id':id},function(data){
			//提示
			$.dialog.tips(data.info);
			
			//更新内容
			if(data.status==1)
			{
				$(self).html('已经刷新');
			}
		}) 
	}
}

//离职删除 - 批量
function batch_employee_del(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认操作?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	//alert(select_values.substr(2));
	
	//显示加载中
	loading('操作中...','3600');
		
	//提交删除
	$.get(getApps()+'?m=ajax&a=employee_del',{'id':select_values.substr(2)},function(data){
	
		//提示
		$.dialog.tips(data.info);
		
		//删除层
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
			});
		
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})
}

//离职删除
function employee_del(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认操作?')===false) return false; }
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');
		
		//提交删除
		$.get(getApps()+'?m=ajax&a=employee_del',{'id':id},function(data){
		
			//提示
			$.dialog.tips(data.info);
			
			//删除层
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
			
		})
	}
}

//添加到已离职 - 批量
function batch_employee_out(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认放到已离职?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	//alert(select_values.substr(2));
	//显示加载中
	loading('操作中...','3600');
		
	//提交删除
	$.get(getApps()+'?m=ajax&a=batch_employee_out',{'id':select_values.substr(2)},function(data){
	
	//提示
	$.dialog.tips(data.info);
	
	//删除层
	$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
	//没元素时3秒后跳转.
	if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	
	})
}

//添加到已入职 - 批量
function batch_employee_in(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认放到已入职?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//alert(select_values.substr(2));
	//显示加载中
	loading('操作中...','3600');
		
	//提交删除
	$.get(getApps()+'?m=ajax&a=batch_employee_in',{'id':select_values.substr(2)},function(data){
	
	//提示
	$.dialog.tips(data.info);
	
	//删除层
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})
}

//添加到已离职
function employee_out(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认放到已离职?')===false) return false; }

	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');
		
		//提交删除
		$.get(getApps()+'?m=ajax&a=employee_out',{'id':id},function(data){
			//提示
			$.dialog.tips(data.info);
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}

			
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
			
		})
	}
}

//添加到已入职
//@params:id - resume_id
function employee_in(self,id)
{
	//提示,确认操作
	if($(self).html()=='已添加入职') 
	{
		$.dialog.tips('已是已入职员工,赶快去看看吧.');
		return false;
	}
	else
	{
		if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确认放到已入职?')===false) return false; }
	 }
	 
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');
		
		//提交删除
		$.get(getApps()+'?m=ajax&a=employee_in',{'id':id},function(data){
		
			if(data.status==1)
			{
				$(self).html('已添加入职');
			}
			//提示
			$.dialog.tips(data.info);
		})
	}
}

//简历回收站 - 批量删除
//查找自身包含class="alert_confirm" 是就弹出确认框
//names 批量i$('input[name='+names+']:checked')
//没元素时3秒后刷新当前页.
function batch_recycled_del(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把这些简历永久删除?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });

	//显示加载中
	loading('操作中...','3600');
		
	//提交删除
	$.get(getApps()+'?m=ajax&a=batch_recycled_del',{'id':select_values.substr(2)},function(data){
		
		//提示
		$.dialog.tips(data.info);
		
		//删除层
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})

}

//简历回收站 - 删除
function recycled_del(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把简历还原永久删除?')===false) return false; }
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');
		
		//提交删除
		$.get(getApps()+'?m=ajax&a=recycled_del',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//提示
			$.dialog.tips(data.info);
			
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		})
	}
}

//简历回收站 - 批量还原
function batch_recycled_recover(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把这些简历还原到收到的简历?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });

	//显示加载中
	loading('操作中...','3600');
	
	//提交查询
	$.get(getApps()+'?m=ajax&a=batch_recycled_recover',{'id':select_values.substr(2)},function(data){
	
		//提示
		$.dialog.tips(data.info);
		
		//删除层
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})
	
}

//简历回收站 - 还原
function recycled_recover(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把简历还原到收到的简历?')===false) return false; }
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');
	
		//提交查询
		$.get(getApps()+'?m=ajax&a=recycled_recover',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//提示
			$.dialog.tips(data.info);
		
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		})
	}
}

/*简历回收站 - 批量添加
//查找自身包含class="alert_confirm" 是就弹出确认框
//names 批量i$('input[name='+names+']:checked')
//没元素时3秒后刷新当前页.
*/
function batch_recycled_add(self,names)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把这些简历放入简历回收站?')===false) return false; }
	
	//得到批量值
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });

	//显示加载中
	loading('操作中...','3600');
	
	//提交查询
	$.get(getApps()+'?m=ajax&a=batch_recycled_add',{'id':select_values.substr(2)},function(data){
		
		//提示
		$.dialog.tips(data.info);

		//删除层
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});

		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href;},3000); }
	})
	
}

//简历回收站 - 添加
function recycled_add(self,id)
{
 	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把简历放进回收站?')===false) return false; }
	
	//验证,操作
	if(isNaN(id)){ $.dialog.tips('参数错误'); }
	else
	{	
		//显示加载中
		loading('操作中...','3600');
	
		//提交查询
		$.get(getApps()+'?m=ajax&a=recycled_add',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
		//提示
		$.dialog.tips(data.info);
		
		//没元素时3秒后跳转.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }

		})
	}
}

//加入人才库 - 批量
//查找自身包含class="alert_confirm" 是就弹出确认框
//names 批量i$('input[name='+names+']:checked')
function batch_favorites_talent_add(self,names)
{	
		//得到批量值,修改字
		var select_values = 0;
		$('input[name='+names+']:checked').each(function(){ 
				select_values +=','+$(this).val();
				$(this).parents('.Apply_tr').next('.Apply_tr1').find('.favorites_talent').html('已在人才库');
		});
 		//确认操作
		if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把这些简历放入简历人才库?')===false) return false; }
		
		//显示加载中
		loading('操作中...','3600');
		
		//提交查询
		$.get(getApps()+'?m=ajax&a=batch_favorites_talent_add',{'id':select_values.substr(2)},function(data){
			
		//提示
		$.dialog.tips(data.info);
		})
	return false; 
}

//加入人才库
//查找自身包含class="alert_confirm" 是就弹出确认框
function favorites_talent_add(self,id)
{	
	//验证,操作
	if(isNaN(id)){ alert('参数错误'); }
	else
	{	
		//提示
		if($(self).html()=='已在人才库') { $.dialog.tips('该简历已经在你人才库里面赶快去看看吧');return false;}
		
		//显示加载中
		loading('操作中...','3600');
		
		//提交查询
		$.get(getApps()+'?m=ajax&a=favorites_talent_add',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).html('已在人才库');
			}
			$.dialog.tips(data.info);
		})
	}
	return false; 
}

//移出人才库
//查找自身包含class="alert_confirm" 是就弹出确认框
function favorites_talent_del(self,id)
{
	//确认操作
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('确定要把简历移出人才库?')===false) return false; }
			
	//验证,操作
	if(isNaN(id)){ alert('参数错误'); }
	else
	{
		//显示加载中
		loading('操作中...','3600');
	
		//提交查询
		$.get(getApps()+'?m=ajax&a=favorites_talent_del',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
			//提示
			$.dialog.tips(data.info);
			
			//没元素时3秒后跳转.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		})
	}
	return false; 
}

//发送邀请
function invite_talent(id)
{
	if(isNaN(id)){ alert('参数错误'); }
	else
	{	
		$.dialog.open(getApps()+'?m=ajax&a=invite_talent&id='+id,{width:'450px',height:'350px'});
	}
	return false;
}

//申请职位
//eid 参数优先处理
function request_job(self,id,eid)
{
	if(isNaN(id)){ alert('参数错误'); }
	else
	{	
		$.dialog.open(getApps()+'?m=ajax&a=request_job&id='+id+'&eid='+eid);
	}
	return false;
}


//关注公司 - 返回文本
function attention_company(self,id)
{
	if(isNaN(id)){ alert('参数错误'); }
	else
	{
		$.get(getApps()+'?m=ajax&a=attention_company',{'id':id},function(data){
			if(data.info=='取消关注')
			{
				$.dialog.tips('关注公司成功');
				$(self).html(data.info);
			}
			else if(data.info=='关注公司')
			{
				$.dialog.tips('取消关注成功');
				$(self).html(data.info);
			}else
			{
				$.dialog.tips(data.info);
			}
			
		},'json');
	}
	return false;
}


//收藏职位
function collect_job(self,id)
{
	if(isNaN(id)){ alert('参数错误'); }
	else
	{
		$.get(getApps()+'?m=ajax&a=collect_job',{'id':id},function(data){
			if(data.info=='取消收藏')
			{
				$.dialog.tips('添加收藏成功');
				$(self).html(data.info);
			}
			else if(data.info=='收藏职位')
			{
				$.dialog.tips('取消收藏成功');
				$(self).html(data.info);
			}else
			{
				$.dialog.tips(data.info);
			}
			
		},'json');
	}
	return false;
}

//区域打印{添加标签<!--startprint-->打印的内容<!--endprint-->}
function print_resume(id) 
{ 
	$('.resume_top').css('height',0);
	$('.talent_potho').css({'top':10,'left':'780px'});
	$('.resume_nav').hide();
	$('.resume_edit li').css('margin-left',0);
	$('.talent_name').css('margin-top','50px')
    $('.resume_button,.resume_nav,.resume_info,.browse_number,.set_style').hide();
	bdhtml=window.document.body.innerHTML; 
	sprnstr="<!--startprint-->"; 
	eprnstr="<!--endprint-->"; 
	prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
	prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 
	window.document.body.innerHTML=prnhtml; 
	window.print(); 
	window.document.body.innerHTML=bdhtml; 
	window.location.href = window.location.href ;
}

//区域打印{添加标签<!--startprint-->打印的内容<!--endprint-->}
function preview() 
{ 
$("#browse_num").hide();
bdhtml=window.document.body.innerHTML; 
sprnstr="<!--startprint-->"; 
eprnstr="<!--endprint-->"; 
prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 
window.document.body.innerHTML=prnhtml; 
window.print(); 
window.document.body.innerHTML=bdhtml; 
$("#browse_num").show();
}


//城市的2级联动.
function isUndefined(variable)
{
	return typeof variable == 'undefined' ? true : false;
}

//当前的分组,默认/index.php
var getApps=(function(){

	if(getArgs()["type"]=='undefine' || getArgs()["type"]=='')
	{
		app_name = '/index.php';
	}
	else
	{
		app_name = getArgs()["type"];
	}
	return app_name;
	})


//获取js文件参数.分组时使用时蛮不错的选择 130401
var getArgs=(function(){
    var sc=document.getElementsByTagName('script');
	if(!(/\?/.test(sc[sc.length-1].src))) return function(){return 'undefined'};
    var paramsArr=sc[sc.length-1].src.split('?')[1].split('&');
    var args={},argsStr=[],param,t,name,value;
    for(var ii=0,len=paramsArr.length;ii<len;ii++){
            param=paramsArr[ii].split('=');
            name=param[0],value=param[1];
            if(typeof args[name]=="undefined"){ //参数尚不存在
                args[name]=value;
            }else if(typeof args[name]=="string"){ //参数已经存在则保存为数组
                args[name]=[args[name]]
                args[name].push(value);
            }else{  //已经是数组的
                args[name].push(value);
            }
    }
    /*在实际应用中下面的showArg和args.toString可以删掉，这里只是为了测试函数getArgs返回的内容*/
    var showArg=function(x){   //转换不同数据的显示方式
        if(typeof(x)=="string"&&!/\/d+/.test(x)) return "'"+x+"'";   //字符串
        if(x instanceof Array) return "["+x+"]" //数组
        return x;   //数字
    }
    //组装成json格式
    args.toString=function()
	{
        for(var ii in args) argsStr.push(ii+':'+showArg(args[ii]));
        return '{'+argsStr.join(',')+'}';
    }
    return function(){return args;} //以json格式返回获取的所有参数
})();
//alert(getArgs());
//alert(getArgs()["username"]);

/*
 *固定滚动
 */

(function($) {
jQuery.fn.PositionFixed = function(options) {
	var defaults = {
		css:'',
		x:0,
		y:0
	};
	var o = jQuery.extend(defaults, options);
	
	var isIe6=false; //is ie ? yes:ie no: not ie
	if($.browser.msie && parseInt($.browser.version)==6)
		isIe6=true;			
	
	var html= $('html');
if (isIe6 && html.css('backgroundAttachment') !== 'fixed') {
		html.css('backgroundAttachment','fixed') 
    };
	
	return this.each(function() {
	var domThis=$(this)[0];
	var objThis=$(this);
		if(isIe6)
		{
			
			 var left = parseInt(o.x) - html.scrollLeft(),
                  top = parseInt(o.y) - html.scrollTop();
                objThis.css('position' , 'absolute');	
				
                domThis.style.setExpression('left', 'eval((document.documentElement).scrollLeft + ' + o.x + ') + "px"');
                domThis.style.setExpression('top', 'eval((document.documentElement).scrollTop + ' + o.y + ') + "px"');
				
		}
		else
		{
			objThis.css('position' , 'fixed').css('top',o.y).css('left',o.x);
		}
	
	});

};


})(jQuery)

//限制字符输入数功能(jQ版)
$(function(){
	$.fn.Textinput = function(options)
	{
		//当textarea 没设maxlength时 最初默认长度为100
		var _maxlen = 100
		if($(this).attr('maxlength')){ _maxlen = $(this).attr('maxlength');}
		
		//默认值
		var defaults = { maxlen:_maxlen,s_area:''}
		var o = jQuery.extend(defaults, options);
		
		//默认输出
		$(this).attr('maxlength',o.maxlen);
		$(o.s_area).html('你还可以输入<span>'+(o.maxlen - $(this).val().length)+'</span>个字符');
		
		//输入时
		$(this).bind('keyup',function()
		{
			if(o.maxlen >= $(this).val().length)
			{
				$(o.s_area).html('你还可以输入<span>'+(o.maxlen - $(this).val().length)+'</span>个字符');
			}
			if(o.maxlen < $(this).val().length)
			{
				$(this).val($(this).val().substring(0,o.maxlen));
			}
		})
	}

})
/*
  *固定广告.支持ie6.窗口调整
 *param selecter = JQUERY的选择器.
 *margintop = 头部的边距
 */
function fixedbox(selecter,margintop)
{
	if(!selecter) return false; 
    //fb = fixedbox
	var fb = {}
		fb.sd = $(selecter); //滚动的DIV - scrollDiv
		fb.dw = fb.sd.before('<div class="fixedlocation" style="height:0px;font-size:0px;overflow:hidden;">&nbsp</div>'); //使用上一层定位位置 onresize 设置为相对位置.
		fb.bw = document.body.offsetWidth;	//页面宽度
		fb.bh = document.body.offsetHeight;	
		fb.mt = fb.sd.offset().top;//距离顶部的距离 - marginTop
		fb.ml = $('.fixedlocation').offset().left;//body到左边层的距离 -marginLeft	
		fb.mh =  0; //
		if(!isNaN(margintop)) fb.mh =  margintop;
		
//兼容IE6 ╮(╯_╰)╭.	
var isIE6=!!window.ActiveXObject&&!window.XMLHttpRequest;
$(window).scroll(function()
{
	this.s = document.documentElement.scrollTop || document.body.scrollTop;//滚动条位置
	if(this.s>(fb.mt-fb.mh))
	{
		if(isIE6)
		{
			fb.sd.offset({top:(this.s+fb.mh),left:fb.ml});
		}
		else
		{
			fb.sd.css({'position':'fixed','top':fb.mh,'left':fb.ml});
		}
	}
	else
	{
		//fb.sd.animate({top:fb.mt+'px'},'fast').offset({left:fb.ml})
		fb.sd.offset({top:fb.mt,left:fb.ml});
	}
});
/*
window.onresize = function(){
	//if((fb.bh/2)>fb.sd.height()) return false;
	 this.s = document.documentElement.scrollTop || document.body.scrollTop;//滚动条位置
	 fb.ml = $('.fixedlocation').offset().left;
	 //alert(fb.mt)
	if(this.s>(fb.mt-fb.mh))
	{
		if(isIE6)
		{
			fb.sd.offset({top:(this.s+fb.mh),left:fb.ml});
		}
		else
		{
			fb.sd.css({'position':'fixed','top':fb.mh,'left':fb.ml});
		}
	}
	else
	{
		fb.sd.offset({top:fb.mt,left:fb.ml});
	}
}
*/
}
//确认操作
var alert_confirm=function(text){ if(!text) text='确认操作?'; if(confirm(text)===false) return false;}

//加载中提示
var loading = function(content,show_time){
	if(!content){ content = '操作中...';}
	if(!show_time){ show_time = '3'}
	$.dialog.tips('<img src="public/img/loading_27.gif" align="absmiddle" width=25> '+content,show_time);	

}