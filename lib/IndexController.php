<?php
namespace lib;
use lib\ApiController as API;
new \Twig_Extension_Debug;
class IndexController
{
	static $twig; //构造获取模版
	
	function __construct(){
		
		$loader = new \Twig_Loader_Filesystem(ROOT_DIR.'\tpl\default-style');
// 		self::$twig = new \Twig_Environment($loader, array('cache' => 'cache',));
		self::$twig = new \Twig_Environment($loader,array('debug' => false,));
		self::$twig->addExtension(new \Twig_Extension_Debug());
	}
	
	function headerAction(){
		$result = array();
		$result['navigaction'] = API::menuAction();
// 		var_dump($result);
		return self::$twig->render('header.twig',$result);
	}
	
	function IndexAction($id=1,$p=1)
	{
		echo $this->headerAction();
		echo $this->headerAction();
		echo $this->headerAction();
		echo $this->headerAction();
		echo $this->headerAction();
// 		$result = array();
// 		$result['header_block'] = $this->headerAction();
// 		return self::$twig->render('index.twig',$result);
	}
	
}
