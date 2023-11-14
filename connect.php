<?php 

// http://127.0.0.1/phpmyadmin

$username=$_POST['username'];
$trial_num=$_POST['trial_num'];
$map_num=$_POST['map_num'];
$versions=$_POST['version'];
$rewards=$_POST['rewards'];
$tokens=$_POST['tokens'];
$hammers=$_POST['hammers'];
$walls=$_POST['walls'];
$point_to=$_POST['signal'];
$rt=$_POST['rt'];
$conf_rating=$_POST['conf_rating'];
$serious=$_POST['serious'];
$strategy=$_POST['strategy'];
$problems=$_POST['problems'];


$dbhost='co28d739i4m2sb7j.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
$dbuser='ciqkb98i04oi5mqj';
$dbpass='yge7sok0jdptl8eh';
$db='xj2tpr6deo31cluv';
$con=mysqli_connect($dbhost,$dbuser,$dbpass,$db);

if($con){
    // echo "connection successful!";
    $sql="INSERT INTO `exp_responses`(username,trial_num,map_num,versions,rewards,tokens,hammers,walls,point_to,rt,conf_rating,serious,strategy,problems)VALUES('$username', '$trial_num', '$map_num','$versions','$rewards','$tokens','$hammers','$walls','$point_to','$rt','$conf_rating','$serious','$strategy','$problems')";
    $result=mysqli_query($con,$sql);
}else{
    die(mysqli_error($con));
}


?>
