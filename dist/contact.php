<?php

require 'PHPMailer/PHPMailerAutoload.php';

/* CONFIGURATION */

// from email
$fromEmail = 'jasonspiller@gmail.com';
$fromName = 'Jason Spiller';

// to email
$sendToEmail = 'jasonspiller@gmail.com';
$sendToName = 'Jason Spiller';

// smtp credentials
$smtpHost = 'tls://smtp.gmail.com:587';
$smtpUsername = 'jasonspiller@gmail.com';
$smtpPassword = 'targ3t';

// form field names
$fields = array('name' => 'Name', 'phone' => 'Phone', 'email' => 'Email', 'bedrooms' => 'Br', 'bathrooms' => 'Ba', 'interval' => 'Int', 'quote' => 'Quote');

// confirmation message
$okMessage = 'Contact form successfully submitted. Thank you, we will get back to you soon!';

// error message
$errorMessage = 'There was an error while submitting the form. Please try again later';


// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try {
    if (count($_POST) == 0) {
        throw new \Exception('Form is empty.');
    }
    
    $emailText = "";
    
    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email
        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }
    
    // create new mail
    $mail = new PHPMailer;
    
    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($sendToEmail, $sendToName);
    $mail->addAddress('3035225424@messaging.sprintpcs.com', 'Jason Spiller');
    $mail->addReplyTo($from);
    
    $mail->isHTML(false);
    
    $mail->Subject = $_POST['name'];
    $mail->Body = $emailText;
    
    // set as SMTP
    $mail->isSMTP();
    
    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';
    
    // hostname
    $mail->Host = gethostbyname($smtpHost);
    
    // port
    $mail->Port = 587;
    
    // encryption
    $mail->SMTPSecure = 'tls';
    
    // use SMTP authentication
    $mail->SMTPAuth = true;
    
    // username
    $mail->Username = $smtpUsername;
    
    // password
    $mail->Password = $smtpPassword;
    
    // sending error
    if (!$mail->send()) {
        throw new \Exception('Could not send the email.' . $mail->ErrorInfo);
    }
    
    // sending confirmation
    $responseArray = array('type' => 'success', 'message' => $okMessage);

} catch (\Exception $e) {

    // $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}

header("Location:index.html");

//echo $responseArray['message'];