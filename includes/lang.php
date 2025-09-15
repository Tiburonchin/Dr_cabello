<?php
// Bootstrap de idioma: detecta, setea cookie y expone $lang, $t, $tr
$lang = 'es';
if (isset($_GET['lang'])) {
    $lang = strtolower($_GET['lang']) === 'en' ? 'en' : 'es';
} elseif (!empty($_COOKIE['lang'])) {
    $lang = strtolower($_COOKIE['lang']) === 'en' ? 'en' : 'es';
}
// cookie por 180 días
setcookie('lang', $lang, [
    'expires' => time() + 60*60*24*180,
    'path' => '/',
    'secure' => false,
    'httponly' => false,
    'samesite' => 'Lax',
]);

$t = require __DIR__ . '/i18n.php';
$tr = $t[$lang] ?? $t['es'];
