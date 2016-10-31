<?php
namespace core;
class Config{
	static  $config;
	static  $DefaultModule = 'index';
	static  $DefaultAction = 'index';
	
	static function CoreConfig(){
// 		include '../conf/conf.php';
	}
	
	static function RouterExtendConfig(){
		$filepath = 'conf/router.php';
		return file_exists($filepath)?include($filepath):array($DefaultModule=>$DefaultAction);
	}
	
	static public function get($key=NULL){
		if( empty($key) ) return self::$config;
		$arr = explode('.', $key);
		switch( count($arr) ){
			case 1 :
				if( isset(self::$config[ $arr[0] ])) {
					return self::$config[ $arr[0] ];
				}
				break;
			case 2 :
				if( isset(self::$config[ $arr[0] ][ $arr[1] ])) {
					return self::$config[ $arr[0] ][ $arr[1] ];
				}
				break;
			case 3 :
				if( isset(self::$config[ $arr[0] ][ $arr[1] ][ $arr[2] ])) {
					return self::$config[ $arr[0] ][ $arr[1] ][ $arr[2] ];
				}
				break;
			default: break;
		}
		return NULL;
	}

	static public function set($key, $value){
		$arr = explode('.', $key);
		switch( count($arr) ){
			case 1 :
				self::$config[ $arr[0] ] = $value;
				break;
			case 2 :
				self::$config[ $arr[0] ][ $arr[1] ] = $value;
				break;
			case 3 :
				self::$config[ $arr[0] ][ $arr[1] ][ $arr[2] ] = $value;
				break;
			default: return false;
		}
		return true;
	}
}