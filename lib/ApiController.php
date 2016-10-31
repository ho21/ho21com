<?php
namespace lib;
use core\ext\http\Response;
use core\Db as DB;
use core\Core;

class ApiController
{

	static function testAction(){
// 		return false;
// 		return 1000.0101;
// 		return new test();
// 		return ("dfasfsdaddf");
// 		return array("abc","sdfsfs");
// 		return array();
	}
	
	
	/**
	 * 所有的菜单
	 **/
	static function menuAction($p=1,$n=10){
		try{
            $ckey = getKey(array(__FUNCTION__=>func_get_args()));
            $page  = VerifyPage($p, array($n,10));
            $sql   = 'select * from ho21_category order by order_id limit %d,%d';
            $parse = array($page['ls'],$page['n']);
//          unset($_SESSION[$ckey]);
			$_SESSION[$ckey] = empty($_SESSION[$ckey])?Db::select($sql,$parse):$_SESSION[$ckey];
			return $_SESSION[$ckey];
		}
		catch(\Exception $e){ return error($e->getMessage()); }	
	}

	/**
	 * $id 为空时查全部类别
	 * $id 不为空时查相关类别
	 **/
	static function listAction($id=0,$p=1,$n=20){
		try{
			$ckey = getKey(array(__FUNCTION__=>func_get_args()));
			$page = VerifyPage($p, array($n,20));
// 			unset($_SESSION[$ckey]);
			$sql = "select i.*,c.category_title from ho21_images i,ho21_category c where i.category_id = c.category_id  order by images_time desc limit %d,%d";
			$parse = array($page['ls'],$page['n']);
			if(is_numeric($id) && $id>0){
				$sql = "select i.*,c.category_title from ho21_images i,ho21_category c where i.category_id = c.category_id and i.category_id=%d order by images_time desc limit %d,%d";
				$parse=array($id,$page['ls'],$page['n']);
			}
			$_SESSION[$ckey] = empty($_SESSION[$ckey])?DB::select($sql,$parse):$_SESSION[$ckey];
			$return = success($_SESSION[$ckey]);
		}
		catch(\Exception $e){ $return = error($e->getMessage()); }
		return new Response($return,200,array('Content-Type'=>'application/json;charset=utf-8'));
	}
		
	/**
	 * 类别浏览加1,并返回最新浏览数
	 **/
	static function MenuBrowseAction($id=0){
		try{
			if(!is_numeric($id)||$id<1) throw new \Exception('error parameters!');
			DB::exec("update ho21_category set browse_num=browse_num+1 where category_id=%d",array($id));
			$result = DB::find("select browse_num from ho21_category where category_id=%d",array($id));
			$return = success($result);
		}
		catch(\Exception $e){ $return = error($e->getMessage()); }
		return new Response($return,200,array('Content-Type'=>'application/json;charset=utf-8'));
	}
}

class test{
	
	function showText(){
		return "show text";
		
	}
	
}
