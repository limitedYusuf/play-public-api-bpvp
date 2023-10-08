<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$url = "https://doa-doa-api-ahmadramadhan.fly.dev/api";
$response = file_get_contents($url);

echo $response;
?>
