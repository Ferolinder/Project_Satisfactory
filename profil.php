<?php
    $PageTitle="Profil";

    function customPageHeader(){?>
    <meta name="description" content="Profil page to view and edit user information">
    <link rel="stylesheet" href="css/style.css">
    <script src="scripts/profil.js" defer></script>
    <script src="scripts/ajax.js" defer></script>
    <?php }

    include_once('./php/inject/header.php');
?>

    <h1>User Profile</h1>
    <p>This is the profil page. Here you can view and edit your user information.</p>
  </body>
</html>