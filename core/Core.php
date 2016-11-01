<?php
/**
 * 未经允许,请勿复制使用.
 * author san_born@163.com
 **/
namespace core;
//use core\ext\http\Response;

class Core{
	static $info = array();
	static function run(){
		try{
			//debug set error display
			if(!defined('DEBUG')) define('DEBUG',false);
			ini_set("display_errors",DEBUG?1:0);
			error_reporting(DEBUG?E_ALL ^ E_NOTICE:0);
			//include Config
			if(file_exists('Config.php')) throw new \Exception("can\'t find the config");
			$Config = include 'Config.php';
			//check Config
			if(!is_array($Config)) throw new \Exception("config is error.");
			//session start
			if($Config['StartSession']) session_id()||session_start();
			//set timezone
			date_default_timezone_set($Config['PRC']);
			//
			$ContentType = $Config['ContentType'];
			$Charset = $Config['Charset'];
			//router set
			$DefaultModule = $Config['DefaultModule'];
			$DefaultAction = $Config['DefaultAction'];
			$RouterConfig = array($DefaultModule=>$DefaultAction);
			//string check only string
			if(empty($DefaultModule)) throw new \Exception('Controller error');
			if(empty($DefaultAction)) throw new \Exception('Module error');
			//load router file
			if(file_exists('conf/router.php')){
				$RouterConfig = include 'conf/router.php';
			}
			//
			$Url = array();
			$Url['PathInfo'] = isset($_SERVER['PATH_INFO'])?$_SERVER['PATH_INFO']:'/';
			$Url['Array']    = explode('/',$Url['PathInfo']);
			$Url['Params']   = array_slice($Url['Array'],3);
			$Url['Module']   = empty($Url['Array'][1])?$DefaultModule:$Url['Array'][1];
			$Url['Action']   = empty($Url['Array'][2])?$DefaultAction:$Url['Array'][2];
			//
			$File = array();
			$File['Name']	 = $Url['Module'];
			$File['Path'] 	 = key_exists($File['Name'],$RouterConfig)?$RouterConfig[$File['Name']]:sprintf("%s/%s%s.php",$Config['LibDir'],$Url['Module'],$Config['FileNameExtend']);		
			$File['Action']  = sprintf("%s%s",$Url['Action'],$Config['FunctionExtend']);
			$File['Array']	 = pathinfo($File['Path']);
			$File['Controller'] = sprintf("%s\\%s",$File['Array']['dirname'],$File['Array']['filename']);
			//set class info
			self::$info['url'] = $Url;
			self::$info['file'] = $File;
			//check file
			if(!file_exists(ROOT_DIR.'/'.$File['Path'])) throw new \Exception('can\'t find the file');
			//find and exec
			require(ROOT_DIR.'/'.$File['Path']);
			//check class
			if(!class_exists($File['Controller'])) throw new \Exception('can\'t find the class');
			//check function action
			if(!method_exists($File['Controller'],$File['Action'])) throw new \Exception('can\'t find the method');
			//load default function file.
			$DefaultFunction = CORE_DIR.'Functions.php';
			file_exists($DefaultFunction) && require_once($DefaultFunction);
			//load action
			$method =  new \ReflectionMethod($File['Controller'],$File['Action']);
			if(!$method->isPublic()) throw new \Exception('Access denied, illegal module');
			$Params = array();
			$originParams = $Url['Params'];
			//get,post maerge to request
			$_REQUEST = array_merge($_POST,$_GET);
			if($method->getNumberOfParameters()>0)
			{
				$ParamsArray =  $method->getParameters();
				foreach ($ParamsArray as $key=>$param)
				{
					$name = $param->getName();
					if($param->isDefaultValueAvailable()){
						$Params[$key] = $param->getDefaultValue();
					}
					if(isset($originParams[$key])&&$originParams[$key]!==null){
						$Params[$key] = $originParams[$key];
					}
					if(isset($_REQUEST[$name])&&$_REQUEST[$name]!==null){
						$Params[$key] = $_REQUEST[$name];
					}	
				}
			}
			$return = $method->invokeArgs(new $File['Controller'](),$Params);
			//object && resource 
			if(is_object($return)||is_resource($return)) $return = '';
			//boolean
			if(is_bool($return)) $return = $return?1:0;
			//array
			if(is_array($return)){
				$return = json_encode($return);
				$ContentType = "application/json";
			}
			//response out put set
			$ContentType = empty($_REQUEST['_contenttype'])?$ContentType:$_REQUEST['_contenttype'];
			$Charset = empty($_REQUEST['_charset'])?$Charset:$_REQUEST['_charset'];
// 			$response = new Response($return,200,array('Content-Type'=>"$ContentType;charset=$Charset"));
// 			$response->send();
			header("Content-type:$ContentType;charset=$Charset");
			exit($return);
// 		}catch (\ReflectionException $e){
// 			DEBUG&&exit($e->getMessage());
		}catch (\Exception $e){
			if(DEBUG){
				header("Content-type:application/json;charset=utf-8");
				$FilePath = pathinfo($e->getFile());
				$return = array();
				$return['message'] =  $e->getMessage();
				$return['line'] =  $e->getLine();
				$return['file']	= $FilePath['basename'];
// 				$return['info'] = self::$info['file'];
				exit(json_encode($return));
			}
		}
	}
}