<?php
define('ROOT_DIR',dirname(__FILE__));
define('ROOT_PATH',__DIR__);
define('CORE_DIR',ROOT_DIR.'/core/');
define('LIB_DIR',ROOT_PATH.'/lib/');
define('TPL_DIR',ROOT_PATH.'/tpl/');
define('VENDOR_PATH',ROOT_PATH.'/vendor/');
define('DEBUG',true);
use core\Conf;
use core\db;
use core\ext\http\Response;
use core\Core;
spl_autoload_register(function($class){
	$FilePath = ROOT_DIR.'\\'.$class;
	$FilePath = str_replace("\\","/",$FilePath);
	$FileName = $FilePath.'.php';
	file_exists($FileName) && require $FileName;
});
Core::run();
