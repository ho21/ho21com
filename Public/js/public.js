/*
*20130516
*appsͨ�õ�js
*author san_born@163.com
*
* +---------�����б�-------------.
*��������ʾ
*ȷ�ϲ���
*�����ַ�����������
*�̶�����
*���е�2������
*�����ӡ- QQ.JOBAY.COM.CN
*�����ӡ- WWW.JOBAY.COM.CN
*�ղ�ְλ
*��ע��˾ - �����ı�
*����ְλ
*��������
*�Ƴ��˲ſ�
*�����˲ſ�
*�����˲ſ� - ����
*��������վ - ���
*��������վ - �������
*��������վ - ��ԭ
*��������վ - ������ԭ
*��������վ - ɾ��
*��������վ - ����ɾ��
*��ӵ�����ְ
*��ӵ�����ְ
*��ӵ�����ְ - ����
*��ӵ�����ְ - ����
*��ְɾ�� - ����
*ˢ��ְλ
*ˢ��ְλ - ����
*ְλ����վ - ���
*ְλ����վ - �������
*ְλ����վ - ����ɾ��
*ְλ����վ - ��������ɾ��
*ְλ����
*ְλ���� 
*ְλ����- �������
*��ʾ��������� - �������Եļ�¼.
*�ϴ�ͷ��
*��Ļ���¹���
*�ص��ɰ汾
*��������ְλ
*����������ҵ����
*û��ͼƬ����
*���Ź���
*����״̬
*����ˢ��
*ɾ������
*�����ŵ��˲ſ�(���ؼ���).
*����,�޸���ְ��.
*������������
*/

//�鿴����.
function look_invitation(id,text)
{
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		$.get(getApps()+'?m=ajax&a=look_invitation',{'id':id},function(data){
		if(data.status===1)  $.dialog(text).lock(true);
		},'json')
	}
}

//������������
function release_resume(id,state)
{
	var w = 600; //���
	 //var h = 310;   //�߶�
	 //var t = (screen.height-h)/2; //�붥������
	 var l = (screen.width-w)/2; //����߾���
	window.open(getApps()+'?m=talent&a=myresume&resume_id='+id+'&close='+state,'','width=800,location=no,scrollbars=yes,titlebar=no,top=10,left='+l)
}

//����,�޸�,ɾ����ְ��
function talent_recommend_letter(id,type)
{

	if(type=='delete')
	{
		//ȷ�ϲ���
	   if(alert_confirm('ȷ��ɾ����ǰ��ְ��?')===false) return false; 
		$.get(getApps()+'?m=ajax&a=talent_recommend_letter',{'id':id,'type':type},function(data){ 
		$.dialog.tips(data.info); 
		if(data.status == 1) window.location.href = window.location.href ;	
		},'json');
	
	}
	else
	{
		$.dialog.open(getApps()+'?m=ajax&a=talent_recommend_letter&id='+id+'&type='+type,{title: '����,�޸�,ɾ����ְ��',width:'450px' }).lock(true);
	}


}

//�����ŵ��˲ſ�(���ؼ���).
function download(resume_id) 
{
	if(alert_confirm('ȷ�ϲ鿴��ǰ����?')===false) return false; 
	//��֤,����
	if(isNaN(resume_id)){ $.dialog.tips('��������'); }
	else
	{	
		$.get(getApps()+"?m=ajax&a=check_bank",{'resume_id':resume_id,'do':'collect'},
		function(data)
		{
			if(data.status==1)
			{
				$.dialog
				({
					title:'�鿴����',
					content:data.info,
					ok:function(){ window.location.href=window.location.href; }
				})
			}
			else
			{
				$.dialog
				({
					title:'�鿴����',
					content:data.info,
					ok:true
				})
			}
		},"json");
	}
}

//ְλ����������
function jzfx(id)
{
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		$.dialog.open(getApps()+'?m=talent&a=jzfx&id='+id,{title: 'ְλ����������',width:'530px' }).lock(true)
	}
}

//ɾ������
function resume_delete(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��ɾ����ǰ����?')===false) return false; }

	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');
 		//�ύ
		$.get(getApps()+'?m=ajax&a=resume_delete',{'id':id},function(data){
				//��ʾ
				$.dialog.tips(data.info);
				if(data.status==1) $(self).parents('tr').fadeOut('normal');
		}) 
	}
}

//����ˢ��
function resume_refresh(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��ˢ�µ�ǰ����?')===false) return false; }

	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύ
		$.get(getApps()+'?m=ajax&a=resume_refresh',{'id':id},function(data){
 			if(data.status==1)
			{
				//��ʾ
				$.dialog.tips(data.info.msg);
				//��������
				$(self).parents('tr').find('.resume_refresh').html(data.info.time);
			}
			else
			{	
				//��ʾ
				$.dialog.tips(data.info);
			}
		}) 
	}

}


//����״̬
function resume_status(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ���޸�?')===false) return false; }
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύɾ��
		$.get(getApps()+'?m=ajax&a=resume_status',{'id':id},function(data){
			//��������
			if(data.status==1) 
			{
				$(self).html(data.info);
				//��ʾ
				$.dialog.tips('�����ɹ�');
			}
			else
			{
					$(self).html(data.info);
				//��ʾ
				$.dialog.tips('�����ɹ�');
			
			}
		}) 
	}
}
//���Ź���
function department_manage(target,id)
{
	$.dialog.open(getApps()+'?m=enterprise&a=department',{title: '���Ź���',width:'530px',close:function(){ 
			$(target).load('/apps.php?m=enterprise&a=department&status=true&id='+id); 
	} }).lock(true)
}

/*
 *û��ͼƬ���� - onerror
 *@param shape	  Ĭ��������- nopic.png
 *@param shape - x ��ĳ����� - xnopic.png
 *@param shape - y ���ĳ����� - ynopic.png
 */
function nopic(self,shape)
{	
	//������
	if(!shape){ self.src='/public/img/nopic.png'; }
	//��ĳ����� - xnopic.png
	if(shape=='x'){ self.src='/public/img/xnopic.png'; }
	//���ĳ����� - ynopic.png
	if(shape=='y'){ self.src='/public/img/ynopic.png'; }
	self.onerror=null;
}
//����������ҵ����
function release_info()
{
	var w = 600; //���
	 //var h = 310;   //�߶�
	 //var t = (screen.height-h)/2; //�붥������
	 var l = (screen.width-w)/2; //����߾���
	window.open(getApps()+'?m=enterprise&a=release_info','','width=700,location=no,scrollbars=yes,titlebar=no,top=10,left='+l)
}

//��������ְλ
function release_job(id)
{
	var w = 600; //���
	 //var h = 310;   //�߶�
	 //var t = (screen.height-h)/2; //�붥������
	 var l = (screen.width-w)/2; //����߾���
	window.open(getApps()+'?m=enterprise&a=release_job&id='+id,'','width=600,location=no,scrollbars=yes,titlebar=no,top=10,left='+l)
}

//ɾ������
function e_delete_comment(self,id)
{
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{
		if(alert_confirm('ȷ��Ҫɾ����������?')===false) return false;
		$.get(getApps()+'?m=ajax&a=e_delete_comments',{'id':id},function(data){
		//��ʾ
		$.dialog.tips(data.info);
		//ɾ��
		$(self).parents('li').fadeOut('slow');
		},'json');
	}

}

//�ص��ɰ汾
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


//��Ļ���¹���
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


//�ϴ�ͷ��
function upimg(type)
{
	if(!type) alert('��������');
	$.dialog.open(getApps()+'?m=Upload&a=Index&vo='+type,{title: '�ϴ�ͼ��',width:'900px',height:'490px'});
}

//��ʾ��������� - �������Եļ�¼.
function show_message(self)
{
	$.dialog({content:'<div style="line-height:20px;">'+$(self).find('span').html()+'</div>',id:'s1',width: '500px',lock:true});
}

//ְλ����
function batch_position_activation(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϼ��ǰְλ?')===false) return false; }

	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//��ʾ������
	loading('������...','3600');
	
 	//�ύ
	$.get(getApps()+'?m=ajax&a=position_activation',{'id':select_values.substr(2),'ajax':'true'},function(data){
	
		//��ʾ
		$.dialog.tips('����ɹ�');
		
		//��������
		$('input[name='+names+']:checked').each(function(){ 
		$(this).parents('.Apply_tr').find('.recruitment_status').html('��Ƹ��');
		$(this).parents('.Apply_tr').find('.recruitment_start_time').html(data.data);
		$(this).parents('.Apply_tr').find('.recruitment_end_time').html(data.info);
		});
	
	}) 
}

//ְλ����
function position_activation(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϼ��ǰְλ?')===false) return false; }

	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύ
		$.get(getApps()+'?m=ajax&a=position_activation',{'id':id,'ajax':'true'},function(data){
 			if(data.status==1)
			{
				//��ʾ
				$.dialog.tips('����ɹ�');
				//��������
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_status').html('��Ƹ��');
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_start_time').html(data.data);
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_end_time').html(data.info);
			}
			else
			{	
				//��ʾ
				$.dialog.tips(data.info);
			}
		}) 
	}

}


//ְλ���� - �������
function batch_position_shielding(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��������Щְλ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//��ʾ������
	loading('������...','3600');
	
	 //�ύ
	$.get(getApps()+'?m=ajax&a=position_shielding',{'id':select_values.substr(2)},function(data){
	
		//��ʾ
		$.dialog.tips(data.info);
			
		//��������
		$('input[name='+names+']:checked').each(function(){ $(this).parents('.Apply_tr').find('.recruitment_status').html('������'); });
		
	}) 
}

//ְλ����
function position_shielding(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�����ε�ǰְλ?')===false) return false; }
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύ
		$.get(getApps()+'?m=ajax&a=position_shielding',{'id':id},function(data){
		
			//��ʾ
			$.dialog.tips(data.info);
			
			//��������
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').find('.recruitment_status').html('������');
			}
		}) 
	}
}


//��ԭְλ
function position_recover(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϰ���ְλ��ԭô?')===false) return false; }

	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύ
		$.get(getApps()+'?m=ajax&a=position_recover',{'id':id},function(data){
			//��ʾ
			$.dialog.tips(data.info);
			
			//ɾ����
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		}) 
	}
}

//ְλ����վ - ��������ɾ��
function batch_position_recover(self,names)
{

	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϰ���Щְλ��ԭ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//��ʾ������
	loading('������...','3600');
		
	//�ύ
	$.get(getApps()+'?m=ajax&a=position_recover',{'id':select_values.substr(2)},function(data){
	
		//��ʾ
		$.dialog.tips(data.info);
		
		//ɾ����
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
		});	
		
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }	
	})
}



//ְλ����վ - ��������ɾ��
function batch_position_delete(self,names)
{

	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϰ���Щְλ�Ž�ְλ����վ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//��ʾ������
	loading('������...','3600');
		
	//�ύ
	$.get(getApps()+'?m=ajax&a=position_delete',{'id':select_values.substr(2)},function(data){
	
		//��ʾ
		$.dialog.tips(data.info);
		
		//ɾ����
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
		});	
		
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }	
	})
}


//ְλ����վ - ����ɾ��
function position_delete(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϰ���ְλ����ɾ��ô?')===false) return false; }

	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύ
		$.get(getApps()+'?m=ajax&a=position_delete',{'id':id},function(data){
			//��ʾ
			$.dialog.tips(data.info);
			
			//ɾ����
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		}) 
	}
}


//ְλ����վ - �������
function batch_position_recycled_add(self,names)
{

	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϰ���Щְλ�Ž�ְλ����վ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//��ʾ������
	loading('������...','3600');
		
	//�ύ
	$.get(getApps()+'?m=ajax&a=position_recycled_add',{'id':select_values.substr(2)},function(data){
	
		//��ʾ
		$.dialog.tips(data.info);
		
		//ɾ����
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
		});	
		
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }	
	})
}

//ְλ����վ - ���
function position_recycled_add(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϰ���Щְλ�Ž�ְλ����վ?')===false) return false; }

	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύ
		$.get(getApps()+'?m=ajax&a=position_recycled_add',{'id':id},function(data){
			//��ʾ
			$.dialog.tips(data.info);
			
			//ɾ����
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		}) 
	}

}

//ˢ��ְλ - ����
function batch_refresh_position(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��ˢ����Щְλ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//��ʾ������
	loading('������...','3600');
		
	//�ύɾ��
	$.get(getApps()+'?m=ajax&a=position_refresh',{'id':select_values.substr(2)},function(data){
	
		//��ʾ
		$.dialog.tips(data.info);
		
		//��������
		$('input[name='+names+']:checked').each(function(){ 
			$(this).parents('.Apply_tr').find('.recruitment_status').html('��Ƹ��'); 
			$(this).parents('.Apply_tr').find('.recruitment_end_time').html(data.url);
		});
			
	})
}

//ˢ��ְλ
function refresh_position(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��ˢ�µ�ǰְλ?')===false) return false; }
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');

 		//�ύɾ��
		$.get(getApps()+'?m=ajax&a=position_refresh',{'id':id},function(data){
			//��ʾ
			$.dialog.tips(data.info);
			
			//��������
			if(data.status==1)
			{
				$(self).html('�Ѿ�ˢ��');
			}
		}) 
	}
}

//��ְɾ�� - ����
function batch_employee_del(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϲ���?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	//alert(select_values.substr(2));
	
	//��ʾ������
	loading('������...','3600');
		
	//�ύɾ��
	$.get(getApps()+'?m=ajax&a=employee_del',{'id':select_values.substr(2)},function(data){
	
		//��ʾ
		$.dialog.tips(data.info);
		
		//ɾ����
		$('input[name='+names+']:checked').each(function(){
				$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
				$(this).parents('.Apply_tr').remove();
			});
		
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})
}

//��ְɾ��
function employee_del(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�ϲ���?')===false) return false; }
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');
		
		//�ύɾ��
		$.get(getApps()+'?m=ajax&a=employee_del',{'id':id},function(data){
		
			//��ʾ
			$.dialog.tips(data.info);
			
			//ɾ����
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
			
		})
	}
}

//��ӵ�����ְ - ����
function batch_employee_out(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�Ϸŵ�����ְ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	//alert(select_values.substr(2));
	//��ʾ������
	loading('������...','3600');
		
	//�ύɾ��
	$.get(getApps()+'?m=ajax&a=batch_employee_out',{'id':select_values.substr(2)},function(data){
	
	//��ʾ
	$.dialog.tips(data.info);
	
	//ɾ����
	$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
	//ûԪ��ʱ3�����ת.
	if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	
	})
}

//��ӵ�����ְ - ����
function batch_employee_in(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�Ϸŵ�����ְ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });
	
	//alert(select_values.substr(2));
	//��ʾ������
	loading('������...','3600');
		
	//�ύɾ��
	$.get(getApps()+'?m=ajax&a=batch_employee_in',{'id':select_values.substr(2)},function(data){
	
	//��ʾ
	$.dialog.tips(data.info);
	
	//ɾ����
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})
}

//��ӵ�����ְ
function employee_out(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�Ϸŵ�����ְ?')===false) return false; }

	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');
		
		//�ύɾ��
		$.get(getApps()+'?m=ajax&a=employee_out',{'id':id},function(data){
			//��ʾ
			$.dialog.tips(data.info);
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}

			
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
			
		})
	}
}

//��ӵ�����ְ
//@params:id - resume_id
function employee_in(self,id)
{
	//��ʾ,ȷ�ϲ���
	if($(self).html()=='�������ְ') 
	{
		$.dialog.tips('��������ְԱ��,�Ͽ�ȥ������.');
		return false;
	}
	else
	{
		if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ�Ϸŵ�����ְ?')===false) return false; }
	 }
	 
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');
		
		//�ύɾ��
		$.get(getApps()+'?m=ajax&a=employee_in',{'id':id},function(data){
		
			if(data.status==1)
			{
				$(self).html('�������ְ');
			}
			//��ʾ
			$.dialog.tips(data.info);
		})
	}
}

//��������վ - ����ɾ��
//�����������class="alert_confirm" �Ǿ͵���ȷ�Ͽ�
//names ����i$('input[name='+names+']:checked')
//ûԪ��ʱ3���ˢ�µ�ǰҳ.
function batch_recycled_del(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ����Щ��������ɾ��?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });

	//��ʾ������
	loading('������...','3600');
		
	//�ύɾ��
	$.get(getApps()+'?m=ajax&a=batch_recycled_del',{'id':select_values.substr(2)},function(data){
		
		//��ʾ
		$.dialog.tips(data.info);
		
		//ɾ����
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})

}

//��������վ - ɾ��
function recycled_del(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ�Ѽ�����ԭ����ɾ��?')===false) return false; }
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');
		
		//�ύɾ��
		$.get(getApps()+'?m=ajax&a=recycled_del',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//��ʾ
			$.dialog.tips(data.info);
			
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		})
	}
}

//��������վ - ������ԭ
function batch_recycled_recover(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ����Щ������ԭ���յ��ļ���?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });

	//��ʾ������
	loading('������...','3600');
	
	//�ύ��ѯ
	$.get(getApps()+'?m=ajax&a=batch_recycled_recover',{'id':select_values.substr(2)},function(data){
	
		//��ʾ
		$.dialog.tips(data.info);
		
		//ɾ����
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});
	
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
	})
	
}

//��������վ - ��ԭ
function recycled_recover(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ�Ѽ�����ԭ���յ��ļ���?')===false) return false; }
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');
	
		//�ύ��ѯ
		$.get(getApps()+'?m=ajax&a=recycled_recover',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			//��ʾ
			$.dialog.tips(data.info);
		
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		})
	}
}

/*��������վ - �������
//�����������class="alert_confirm" �Ǿ͵���ȷ�Ͽ�
//names ����i$('input[name='+names+']:checked')
//ûԪ��ʱ3���ˢ�µ�ǰҳ.
*/
function batch_recycled_add(self,names)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ����Щ���������������վ?')===false) return false; }
	
	//�õ�����ֵ
	var select_values = 0;
	$('input[name='+names+']:checked').each(function(){ select_values +=','+$(this).val(); });

	//��ʾ������
	loading('������...','3600');
	
	//�ύ��ѯ
	$.get(getApps()+'?m=ajax&a=batch_recycled_add',{'id':select_values.substr(2)},function(data){
		
		//��ʾ
		$.dialog.tips(data.info);

		//ɾ����
		$('input[name='+names+']:checked').each(function(){
			$(this).parents('.Apply_tr').next('.Apply_tr1').remove();
			$(this).parents('.Apply_tr').remove();
		});

		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href;},3000); }
	})
	
}

//��������վ - ���
function recycled_add(self,id)
{
 	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ�Ѽ����Ž�����վ?')===false) return false; }
	
	//��֤,����
	if(isNaN(id)){ $.dialog.tips('��������'); }
	else
	{	
		//��ʾ������
		loading('������...','3600');
	
		//�ύ��ѯ
		$.get(getApps()+'?m=ajax&a=recycled_add',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
		//��ʾ
		$.dialog.tips(data.info);
		
		//ûԪ��ʱ3�����ת.
		if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }

		})
	}
}

//�����˲ſ� - ����
//�����������class="alert_confirm" �Ǿ͵���ȷ�Ͽ�
//names ����i$('input[name='+names+']:checked')
function batch_favorites_talent_add(self,names)
{	
		//�õ�����ֵ,�޸���
		var select_values = 0;
		$('input[name='+names+']:checked').each(function(){ 
				select_values +=','+$(this).val();
				$(this).parents('.Apply_tr').next('.Apply_tr1').find('.favorites_talent').html('�����˲ſ�');
		});
 		//ȷ�ϲ���
		if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ����Щ������������˲ſ�?')===false) return false; }
		
		//��ʾ������
		loading('������...','3600');
		
		//�ύ��ѯ
		$.get(getApps()+'?m=ajax&a=batch_favorites_talent_add',{'id':select_values.substr(2)},function(data){
			
		//��ʾ
		$.dialog.tips(data.info);
		})
	return false; 
}

//�����˲ſ�
//�����������class="alert_confirm" �Ǿ͵���ȷ�Ͽ�
function favorites_talent_add(self,id)
{	
	//��֤,����
	if(isNaN(id)){ alert('��������'); }
	else
	{	
		//��ʾ
		if($(self).html()=='�����˲ſ�') { $.dialog.tips('�ü����Ѿ������˲ſ�����Ͽ�ȥ������');return false;}
		
		//��ʾ������
		loading('������...','3600');
		
		//�ύ��ѯ
		$.get(getApps()+'?m=ajax&a=favorites_talent_add',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).html('�����˲ſ�');
			}
			$.dialog.tips(data.info);
		})
	}
	return false; 
}

//�Ƴ��˲ſ�
//�����������class="alert_confirm" �Ǿ͵���ȷ�Ͽ�
function favorites_talent_del(self,id)
{
	//ȷ�ϲ���
	if($(self).attr('class').indexOf('alert_confirm')>=0){ if(alert_confirm('ȷ��Ҫ�Ѽ����Ƴ��˲ſ�?')===false) return false; }
			
	//��֤,����
	if(isNaN(id)){ alert('��������'); }
	else
	{
		//��ʾ������
		loading('������...','3600');
	
		//�ύ��ѯ
		$.get(getApps()+'?m=ajax&a=favorites_talent_del',{'id':id},function(data){
			if(data.status==1)
			{
				$(self).parents('.Apply_tr1').prev('.Apply_tr').remove();
				$(self).parents('.Apply_tr1').remove();
			}
			
			//��ʾ
			$.dialog.tips(data.info);
			
			//ûԪ��ʱ3�����ת.
			if($('.Apply_tr').size()==0){ setTimeout(function(){  location.href=location.href; },3000); }
		})
	}
	return false; 
}

//��������
function invite_talent(id)
{
	if(isNaN(id)){ alert('��������'); }
	else
	{	
		$.dialog.open(getApps()+'?m=ajax&a=invite_talent&id='+id,{width:'450px',height:'350px'});
	}
	return false;
}

//����ְλ
//eid �������ȴ���
function request_job(self,id,eid)
{
	if(isNaN(id)){ alert('��������'); }
	else
	{	
		$.dialog.open(getApps()+'?m=ajax&a=request_job&id='+id+'&eid='+eid);
	}
	return false;
}


//��ע��˾ - �����ı�
function attention_company(self,id)
{
	if(isNaN(id)){ alert('��������'); }
	else
	{
		$.get(getApps()+'?m=ajax&a=attention_company',{'id':id},function(data){
			if(data.info=='ȡ����ע')
			{
				$.dialog.tips('��ע��˾�ɹ�');
				$(self).html(data.info);
			}
			else if(data.info=='��ע��˾')
			{
				$.dialog.tips('ȡ����ע�ɹ�');
				$(self).html(data.info);
			}else
			{
				$.dialog.tips(data.info);
			}
			
		},'json');
	}
	return false;
}


//�ղ�ְλ
function collect_job(self,id)
{
	if(isNaN(id)){ alert('��������'); }
	else
	{
		$.get(getApps()+'?m=ajax&a=collect_job',{'id':id},function(data){
			if(data.info=='ȡ���ղ�')
			{
				$.dialog.tips('����ղسɹ�');
				$(self).html(data.info);
			}
			else if(data.info=='�ղ�ְλ')
			{
				$.dialog.tips('ȡ���ղسɹ�');
				$(self).html(data.info);
			}else
			{
				$.dialog.tips(data.info);
			}
			
		},'json');
	}
	return false;
}

//�����ӡ{��ӱ�ǩ<!--startprint-->��ӡ������<!--endprint-->}
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

//�����ӡ{��ӱ�ǩ<!--startprint-->��ӡ������<!--endprint-->}
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


//���е�2������.
function isUndefined(variable)
{
	return typeof variable == 'undefined' ? true : false;
}

//��ǰ�ķ���,Ĭ��/index.php
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


//��ȡjs�ļ�����.����ʱʹ��ʱ�������ѡ�� 130401
var getArgs=(function(){
    var sc=document.getElementsByTagName('script');
	if(!(/\?/.test(sc[sc.length-1].src))) return function(){return 'undefined'};
    var paramsArr=sc[sc.length-1].src.split('?')[1].split('&');
    var args={},argsStr=[],param,t,name,value;
    for(var ii=0,len=paramsArr.length;ii<len;ii++){
            param=paramsArr[ii].split('=');
            name=param[0],value=param[1];
            if(typeof args[name]=="undefined"){ //�����в�����
                args[name]=value;
            }else if(typeof args[name]=="string"){ //�����Ѿ������򱣴�Ϊ����
                args[name]=[args[name]]
                args[name].push(value);
            }else{  //�Ѿ��������
                args[name].push(value);
            }
    }
    /*��ʵ��Ӧ���������showArg��args.toString����ɾ��������ֻ��Ϊ�˲��Ժ���getArgs���ص�����*/
    var showArg=function(x){   //ת����ͬ���ݵ���ʾ��ʽ
        if(typeof(x)=="string"&&!/\/d+/.test(x)) return "'"+x+"'";   //�ַ���
        if(x instanceof Array) return "["+x+"]" //����
        return x;   //����
    }
    //��װ��json��ʽ
    args.toString=function()
	{
        for(var ii in args) argsStr.push(ii+':'+showArg(args[ii]));
        return '{'+argsStr.join(',')+'}';
    }
    return function(){return args;} //��json��ʽ���ػ�ȡ�����в���
})();
//alert(getArgs());
//alert(getArgs()["username"]);

/*
 *�̶�����
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

//�����ַ�����������(jQ��)
$(function(){
	$.fn.Textinput = function(options)
	{
		//��textarea û��maxlengthʱ ���Ĭ�ϳ���Ϊ100
		var _maxlen = 100
		if($(this).attr('maxlength')){ _maxlen = $(this).attr('maxlength');}
		
		//Ĭ��ֵ
		var defaults = { maxlen:_maxlen,s_area:''}
		var o = jQuery.extend(defaults, options);
		
		//Ĭ�����
		$(this).attr('maxlength',o.maxlen);
		$(o.s_area).html('�㻹��������<span>'+(o.maxlen - $(this).val().length)+'</span>���ַ�');
		
		//����ʱ
		$(this).bind('keyup',function()
		{
			if(o.maxlen >= $(this).val().length)
			{
				$(o.s_area).html('�㻹��������<span>'+(o.maxlen - $(this).val().length)+'</span>���ַ�');
			}
			if(o.maxlen < $(this).val().length)
			{
				$(this).val($(this).val().substring(0,o.maxlen));
			}
		})
	}

})
/*
  *�̶����.֧��ie6.���ڵ���
 *param selecter = JQUERY��ѡ����.
 *margintop = ͷ���ı߾�
 */
function fixedbox(selecter,margintop)
{
	if(!selecter) return false; 
    //fb = fixedbox
	var fb = {}
		fb.sd = $(selecter); //������DIV - scrollDiv
		fb.dw = fb.sd.before('<div class="fixedlocation" style="height:0px;font-size:0px;overflow:hidden;">&nbsp</div>'); //ʹ����һ�㶨λλ�� onresize ����Ϊ���λ��.
		fb.bw = document.body.offsetWidth;	//ҳ����
		fb.bh = document.body.offsetHeight;	
		fb.mt = fb.sd.offset().top;//���붥���ľ��� - marginTop
		fb.ml = $('.fixedlocation').offset().left;//body����߲�ľ��� -marginLeft	
		fb.mh =  0; //
		if(!isNaN(margintop)) fb.mh =  margintop;
		
//����IE6 �r(�s_�t)�q.	
var isIE6=!!window.ActiveXObject&&!window.XMLHttpRequest;
$(window).scroll(function()
{
	this.s = document.documentElement.scrollTop || document.body.scrollTop;//������λ��
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
	 this.s = document.documentElement.scrollTop || document.body.scrollTop;//������λ��
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
//ȷ�ϲ���
var alert_confirm=function(text){ if(!text) text='ȷ�ϲ���?'; if(confirm(text)===false) return false;}

//��������ʾ
var loading = function(content,show_time){
	if(!content){ content = '������...';}
	if(!show_time){ show_time = '3'}
	$.dialog.tips('<img src="public/img/loading_27.gif" align="absmiddle" width=25> '+content,show_time);	

}