<?php
namespace lib;
use lib\ApiController as API;

class IndexController
{
	public function indexAction(){
		
		$res = API::menuAction(1,1);
		var_dump($res);
		exit("index");
	}
	
}
