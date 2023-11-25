<?php
include_once("./core.php");
require 'vendor/autoload.php';

$recaptcha = new \ReCaptcha\ReCaptcha('6LdDvBQpAAAAAPLS7PBxXAe7DanzJsGrWhwQCRv9');


// Retrieve the form data sent from the React component
$formData = json_decode(file_get_contents('php://input'), true);

// Extract the data
$name = $formData['name'];
$email = $formData['email'];
$message = $formData['message'];

// Validate the form data
if (empty($name) || empty($email) || empty($message) || empty($recaptcha) ) {
  // Return an error response to the client
  echo json_encode(['message' => 'All fields are required']);
  exit;
}

// Set the recipient email address
$recipient = 'souadalshami1996@gmail.com';

// Set the email subject
$subject = 'New User';

// Set the email headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $name <$email>" . "\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

// SMTP configuration for Gmail
$smtpHost = 'smtp.gmail.com';
$smtpPort = 587;
$smtpUsername = 'souadalshami1996@gmail.com';
$smtpPassword = 'wlih qqlu bzsz tkjq';

// Override SMTP settings
ini_set('SMTP', $smtpHost);
ini_set('smtp_port', $smtpPort);
ini_set('smtp_ssl', 'tls');

// Construct the email body
$body = "Name: $name\n\n";
$body .= "Email: $email\n\n";
$body .= "Message:\n$message";

// Create the SMTP transport
$transport = (new Swift_SmtpTransport($smtpHost, $smtpPort, 'tls'))
    ->setUsername($smtpUsername)
    ->setPassword($smtpPassword);

// Create the Mailer using the transport
$mailer = new Swift_Mailer($transport);

// Create the message
$message = (new Swift_Message($subject))
    ->setFrom([$email => $name])
    ->setTo($recipient)
    ->setBody($body);

// Send the email
$mailSent = $mailer->send($message);

// Return a response to the client
if ($mailSent) {
    echo json_encode(['message' => 'Email sent successfully']);
} else {
    echo json_encode(['message' => 'Failed to send email']);
}
?>