<?php
namespace core;
class Db{

	private static $db = null;
	static function init(){
		if(empty(self::$db)){
			try {
				$db = array();
// 				$db["hostname"] = "rds6rfnuunemq6n.mysql.rds.aliyuncs.com"; //服务器地址
// 				$db["username"] = "ho21"; //数据库用户名
// 				$db["password"] = "ho21com"; //数据库密码
// 				$db["database"] = "db956n7y0i8sgi5t"; //数据库名称
// 				$db["hostname"] = "127.0.0.1"; //服务器地址
// 				$db["username"] = "zjwdb_536196"; //数据库用户名
// 				$db["password"] = "*Ho21com."; //数据库密码
// 				$db["database"] = "zjwdb_536196"; //数据库名称
				$db["hostname"] = "ho21.com"; //服务器地址
				$db["username"] = "root"; //数据库用户名
				$db["password"] = "mysql"; //数据库密码
				$db["database"] = "ho21"; //数据库名称
				$db["charset"] = "utf8";//数据库编码
				$db["pconnect"] = 0;//开启持久连接
				$db["log"] = 0;//开启日志
				$db["logfilepath"] = './';//开启日志
				$dsn  =  'mysql:dbname='.$db["database"].';host='.$db["hostname"];
				$user  =  $db["username"] ;
				$password =  $db["password"] ;
				self::$db = new \PDO ( $dsn ,  $user , $password , array(\PDO::ATTR_PERSISTENT => true,\PDO::ATTR_TIMEOUT =>1));
				self::$db -> setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
				self::$db -> query("set names utf8");
			} catch ( \PDOException $e ) {
				throw new \PDOException(iconv('gbk','utf-8','mysql error:'.$e->getMessage()));
			}
		}
	}

	static function select($sql=null,$parse=array()){
		if($sql&&empty($parse)==false){
			$parse  =   array_map('addslashes',$parse);
			$sql    =   vsprintf($sql,$parse);
		}
		if($sql){
			self::init();
			return self::$db->query($sql)->fetchAll (\PDO::FETCH_ASSOC );
		}
		return null;
	}
	
	static function find($sql=null,$parse=array()){
		if($sql&&empty($parse)==false){
			$parse  =   array_map('addslashes',$parse);
			$sql    =   vsprintf($sql,$parse);
		}
		if($sql){
			self::init();
			return self::$db->query($sql)->fetch(\PDO::FETCH_ASSOC );
		}
		return null;
	}
	
	static function exec($sql=null,$parse=array()){
		if($sql&&empty($parse)==false){
			$parse  =   array_map('addslashes',$parse);
			$sql    =   vsprintf($sql,$parse);
		}
		if($sql){
			self::init();
			return self::$db->exec($sql);
		}
		return null;
	}
}