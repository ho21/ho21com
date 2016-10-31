<?php


function getKey($parse=array()){
	return md5(json_encode($parse));
};

/**/
function RandDate($id=0,$p=1,$n=20){
	
	
	
}

// //成功操作
// function success($message='操作成功',$data=null,$status=1)
// {
// 	if(is_ajax()) JMY($message,$data,$status);
// 	exit($message);
// }


// //错误操作
// function error($message='操作失败',$data=null,$status=0)
// {
// 	if(is_ajax()) JMN($message,$data,$status);
// 	exit($message);
// }

/**常用参数验证,分页,显示数量
 * @param integer $p
 * @param integer || array $n
 * @return array
 * @throws \Exception
 */
function VerifyPage($p,$n)
{
	$arr = array();
	//分页
	if(!is_numeric($p) || $p < 1) throw new \Exception('p parameters illegal');
	$arr['p'] = $p;
	 
	//显示数量
	if(is_array($n))
	{
		if(!is_numeric($n[0])) throw new \Exception('n parameters illegal');
		if(@!is_numeric($n[1])) throw new \Exception('n array is not set maximum');
		if($n[0] <= 0 || $n[1] <=0 ) throw new \Exception('n parameters return number must be greater than 0');
		if($n[0] > $n[1]) throw new \Exception('n return amount cannot exceed a maximum of '.$n[1]);
		$arr['n'] = $n[0];
	}
	else
	{
		if(!is_numeric($n)) throw new \Exception('n parameters illegal');
		if($n > 10) throw new \Exception('n parameters return amount cannot exceed a maximum of 10');
		if($n <=  0) throw new \Exception('n parameters return number must be greater than 0');
		$arr['n'] = $n;
	}
	//数字分页输出
	$arr['ls'] = abs(intval($arr['p'])*$arr['n']-$arr['n']);
	return $arr;
}

//判断是否是AJAX提交
function is_ajax()
{
	return ((isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || !empty($_POST['ajax']) || !empty($_GET['ajax'])) ? true : false;
}


/*数据库连接*/
function select($sql,$exec=false)
{
	$result = null;
	if($sql){
		try {
			$db = array();
			$db["hostname"] = "rds6rfnuunemq6n.mysql.rds.aliyuncs.com"; //服务器地址   
			$db["username"] = "ho21"; //数据库用户名   
			$db["password"] = "ho21com"; //数据库密码   
			$db["database"] = "db956n7y0i8sgi5t"; //数据库名称   
			$db["charset"] = "utf8";//数据库编码   
			$db["pconnect"] = 0;//开启持久连接   
			$db["log"] = 0;//开启日志   
			$db["logfilepath"] = './';//开启日志 
			$dsn  =  'mysql:dbname='.$db["database"].';host='.$db["hostname"];
			$user  =  $db["username"] ;
			$password  =  $db["password"] ;
			$pdo = new \PDO ( $dsn ,  $user , $password , array(\PDO::ATTR_PERSISTENT => true,\PDO::ATTR_TIMEOUT =>1));
			$pdo->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
			$pdo -> query("set names utf8");
			if($exec==true){
				$result = $pdo -> exec($sql);
			}else{
				$result = $pdo -> query($sql) ->fetch(\PDO::FETCH_ASSOC );
			}
		} catch ( \PDOException $e ) {
			throw new \PDOException('mysql error:'.$e->getMessage());
		}
	}
	return $result;
}

/*数据库连接*/
function find($sql,$exec=false)
{
	$result = null;
	if($sql){
		try {
			$db = array();
			$db["hostname"] = "rds6rfnuunemq6n.mysql.rds.aliyuncs.com"; //服务器地址
			$db["username"] = "ho21"; //数据库用户名
			$db["password"] = "ho21com"; //数据库密码
			$db["database"] = "db956n7y0i8sgi5t"; //数据库名称
			$db["charset"] = "utf8";//数据库编码
			$db["pconnect"] = 0;//开启持久连接
			$db["log"] = 0;//开启日志
			$db["logfilepath"] = './';//开启日志
			$dsn  =  'mysql:dbname='.$db["database"].';host='.$db["hostname"];
			$user  =  $db["username"] ;
			$password  =  $db["password"] ;
			$pdo = new \PDO ( $dsn ,  $user , $password , array(\PDO::ATTR_PERSISTENT => true,\PDO::ATTR_TIMEOUT =>1));
			$pdo->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
			$pdo -> query("set names utf8");
			if($exec==true){
				$result = $pdo -> exec($sql);
			}else{
				$result = $pdo -> query($sql) ->fetchAll (\PDO::FETCH_ASSOC );
			}
		} catch ( \PDOException $e ) {
			throw new \PDOException('mysql error:'.$e->getMessage());
		}
	}
	return $result;
}

/** 
 * JMN = JsonMessageYes
 * Json成功数据提示
 * @param array $data
 * @param int $status
 * @param string $message
 * @param int $code
 * @return string
 */
function success($data=array(),$status=1,$message='返回成功',$code=200)
{
	$arr = array();
	$arr['status'] = $status;
	$arr['message'] = $message;
	$arr['code'] = $code;
	$arr['data'] = $data;
	return json_encode($arr);
}

/** 
 * JMN = JsonMessageNo
 * Json错误数据提示
 * @param array $data
 * @param int $status
 * @param string $message
 * @param int $code
 * @return string
 */
function error($data=array(),$status=0,$message='返回错误',$code=400)
{
	$arr = array();
	$arr['status'] = $status;
	$arr['message'] = $message;
	$arr['code'] = $code;
	$arr['data'] = $data;
	return json_encode($arr);
}

/**
 * 发起一个HTTP/HTTPS的请求
 * @param $url 接口的URL
 * @param $params 接口参数   array('content'=>'test', 'format'=>'json');
 * @param $method 请求类型    GET|POST
 * @param $multi 图片信息
 * @param $extheaders 扩展的包头信息
 * @return string
 */
function request( $url , $params = array(), $method = 'GET' , $multi = false, $extheaders = array())
{
	if(!function_exists('curl_init')) exit('Need to open the curl extension');
	$method = strtoupper($method);
	$ci = curl_init();
	curl_setopt ($ci, CURLOPT_COOKIESESSION, true );
	curl_setopt ($ci, CURLOPT_COOKIEJAR, __DIR__);
	curl_setopt($ci, CURLOPT_USERAGENT, 'PHP-SDK OAuth2.0');
	curl_setopt($ci, CURLOPT_CONNECTTIMEOUT,10);
	$timeout = $multi?30:10;
	curl_setopt($ci, CURLOPT_TIMEOUT, $timeout);
	curl_setopt($ci, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ci, CURLOPT_HEADER, false);
	$headers = (array)$extheaders;
	switch ($method)
	{
		case 'POST':
			curl_setopt($ci, CURLOPT_POST, TRUE);
			if (!empty($params))
			{
				if($multi)
				{
					foreach($multi as $key => $file)
					{
						$params[$key] = '@' . $file;
					}
					curl_setopt($ci, CURLOPT_POSTFIELDS, $params);
					$headers[] = 'Expect: ';
				}
				else
				{
					curl_setopt($ci, CURLOPT_POSTFIELDS, http_build_query($params));
				}
			}
			break;
		case 'DELETE':
		case 'GET':
			$method == 'DELETE' && curl_setopt($ci, CURLOPT_CUSTOMREQUEST, 'DELETE');
			if (!empty($params))
			{
				$url = $url . (strpos($url, '?') ? '&' : '?')
				. (is_array($params) ? http_build_query($params) : $params);
			}
			break;
	}
	curl_setopt($ci, CURLINFO_HEADER_OUT, TRUE );
	curl_setopt($ci, CURLOPT_URL, $url);
	if($headers)
	{
		curl_setopt($ci, CURLOPT_HTTPHEADER, $headers );
	}

	$response = curl_exec($ci);
	curl_close ($ci);
	return $response;
}


