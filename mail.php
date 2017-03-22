<?php

include 'vendor/autoload.php';

if (!isset($_POST['name'])) {
    exit;
}

function sendMail()
{
    try {
        $mail = new \PHPMailer();
        $mail->CharSet = 'utf-8';
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'fam.user2017@yandex.ru';
        $mail->Password = 'jS2xdHhc5b67';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->setFrom('fam.user2017@yandex.ru', 'Тестовый');
        $mail->addAddress('s12m12@mail.ru');
        $mail->Subject = 'Сообщение от пользователя: ' . $_POST['name'];
        $mail->Body = 'Сообщение от пользователя: ' . $_POST['name'];
        if (!$mail->send()) {
            return false;
        } else {
            return true;
        }
    } catch (\Exception $e) {
        return false;
    }
}

echo json_encode(['status' => sendMail()]);
