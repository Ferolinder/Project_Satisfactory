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
      <li><a href="profil.php">Profil</a></li>
    </ul>
  <body>