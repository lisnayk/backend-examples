<?php
// Cookie should be set in header before any output
// setcookie("TestCookies", "TestCookies-values");
// setcookie("TestCookies2", "TestCookies-values");
// setcookie("TestCookies3", "TestCookies-values", time() + 5, "/", "localhost", 1, 1);
//-------------------------------------------------
// Session should be set in header before any output
session_start();
//-------------------------------------------------
echo "<h1>Session tests</h1>";


echo "<h3>Cookies</h3>";
echo "<pre>";
print_r($_COOKIE);
echo "</pre>";
echo "<h3>Session</h3>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";

$_SESSION['favcolor'] = 'зелёный 123123 12';
$_SESSION['animal']   = 'кот';
$_SESSION['time']     = time();
