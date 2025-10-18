<?php
    $PageTitle="Energy";

    function customPageHeader(){?>
    <meta name="description" content="Energy page to view and edit energy consumption and production">
    <link rel="stylesheet" href="css/style.css">
    <script src="./js/ajax.js" type="module" defer></script>
    <script src="./js/energy.js" type="module" defer></script>
    <script src="./js/common.js" type="module" defer></script>
    <?php }

    include_once('./php/inject/header.php');
?>

    <p>Energy page to view and edit energy consumption and production</p>
    <section id="actualData">
  </body>
</html>