<?php
// Procesa formulario de contacto (JSON)
// Requiere PHP 7.4+

function json_response($ok, $message, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function t($key) {
    $lang = 'es';
    if (isset($_GET['lang'])) {
        $lang = strtolower($_GET['lang']) === 'en' ? 'en' : 'es';
    } elseif (!empty($_COOKIE['lang'])) {
        $lang = strtolower($_COOKIE['lang']) === 'en' ? 'en' : 'es';
    }
    $dict = [
        'es' => [
            'method' => 'Método no permitido',
            'required' => 'Completa los campos obligatorios.',
            'email_invalid' => 'Email inválido.',
            'ok' => '¡Gracias! Te contactaremos pronto.',
            'fail' => 'No se pudo enviar el mensaje.'
        ],
        'en' => [
            'method' => 'Method not allowed',
            'required' => 'Please complete the required fields.',
            'email_invalid' => 'Invalid email.',
            'ok' => 'Thanks! We will contact you soon.',
            'fail' => 'Message could not be sent.'
        ]
    ];
    return $dict[$lang][$key] ?? $key;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, t('method'), 405);
}

// Honeypot
if (!empty($_POST['empresa'] ?? '')) {
    json_response(true, 'Gracias, pronto nos comunicaremos.');
}

// Sanitizar
$nombre   = trim((string)($_POST['nombre'] ?? ''));
$email    = trim((string)($_POST['email'] ?? ''));
$telefono = trim((string)($_POST['telefono'] ?? ''));
$servicio = trim((string)($_POST['servicio'] ?? ''));
$mensaje  = trim((string)($_POST['mensaje'] ?? ''));
$acepto   = isset($_POST['acepto']);

if ($nombre === '' || $email === '' || $mensaje === '' || !$acepto) {
    json_response(false, t('required'));
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(false, t('email_invalid'));
}

$subject = 'Nuevo mensaje de contacto — Doctor Cabello';
$body = "Nombre: {$nombre}\n" .
        "Email: {$email}\n" .
        ($telefono ? "Teléfono: {$telefono}\n" : '') .
        ($servicio ? "Servicio: {$servicio}\n" : '') .
        "Mensaje:\n{$mensaje}\n" .
        "\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? '');

// Configuración de destino (ajusta estos valores)
$to = 'contacto@doctorcabello.pe';
$from = 'no-reply@doctorcabello.pe';

$sent = false;
$error = null;

// Intentar PHPMailer si está disponible
$phpMailerPath = __DIR__ . '/vendor/phpmailer';
if (is_dir($phpMailerPath)) {
    // Buscamos autoload posible (si usa composer, el path cambia)
    $autoloads = [
        __DIR__ . '/vendor/autoload.php',
        __DIR__ . '/vendor/phpmailer/autoload.php'
    ];
    foreach ($autoloads as $a) {
        if (file_exists($a)) { require_once $a; break; }
    }
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        try {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            // $mail->isSMTP();
            // $mail->Host = 'smtp.tu-proveedor.com';
            // $mail->SMTPAuth = true;
            // $mail->Username = 'usuario';
            // $mail->Password = 'clave';
            // $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            // $mail->Port = 587;

            $mail->CharSet = 'UTF-8';
            $mail->setFrom($from, 'Web Doctor Cabello');
            $mail->addAddress($to);
            $mail->addReplyTo($email, $nombre);
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->AltBody = $body;

            $sent = $mail->send();
        } catch (Throwable $e) {
            $error = $e->getMessage();
        }
    }
}

// Fallback nativo
if (!$sent) {
    $headers = [
        'From: Web Doctor Cabello <' . $from . '>',
        'Reply-To: ' . $nombre . ' <' . $email . '>',
        'Content-Type: text/plain; charset=UTF-8'
    ];
    $sent = @mail($to, $subject, $body, implode("\r\n", $headers));
}

if ($sent) {
    json_response(true, t('ok'));
}
json_response(false, t('fail') . ($error ? ' Detalle: ' . $error : ''));
?>