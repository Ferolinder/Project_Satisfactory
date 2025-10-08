<?php
    $PageTitle="Mine_OLD";

    function customPageHeader(){?>
    <meta name="description" content="Mine page to view and edit mining operations">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/ajax.js" defer></script>
    <script src="js/mine.js" defer></script>
    <script src="js/common.js" defer></script>
    <?php }

    include_once('./php/inject/header.php');
?>
    <h1>Mine Page</h1>
    <p>Mine page to view and edit mining operations</p>
    
    <section id="actualData">
        <div id="item">
            <h2> List of all item produced</h2>
        </div>
        <div id="mine">
            <h2> List of all mine</h2>
        </div>
    </section>

    <section id="addForm">
        <h2> Add a new mine</h2>
    </section>

    <section id="modal">
        <div id="editForm">
            <h2> Edit this mine</h2>
        </div>
    </section>
    </body>
</html>