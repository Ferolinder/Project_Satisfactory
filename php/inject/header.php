<!doctype html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title><?= isset($PageTitle) ? $PageTitle : "Default Title"?></title>
    <!-- Additional tags here -->
    <?php if (function_exists('customPageHeader')){
      customPageHeader();
    }?>
  </head>
  <nav>
    <ul>
      <li><a href="index.php">Home</a></li>
      <li><a href="mine.php">Mine</a></li>
      <li><a href="energy.php">Energy</a></li>
      <li><a href="currency.php">Currency</a></li>
      <li><a href="carry.php">Carry</a></li>
    </ul>
  </nav>
  <body>