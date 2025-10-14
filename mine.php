<?php
    $PageTitle="Mine";

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
    
    <section id="add">
        <h2> Add a new mine</h2>
        <form id="addForm">
            <!-- Input name -->
            <label for="name_addForm">Mine name :</label>
            <input type="text" id="name_addForm" name="name_addForm" required>

            <!-- Input quality -->
            <label for="quality_addForm">Mine quality :</label>
            <select id="quality_addForm" required>
                <option value="">Select quality</option>
                <option value="1">Impure</option>
                <option value="2">Normal</option>
                <option value="4">Pure</option>
            </select>

            <!-- Imput machine -->
            <label for="machine_addForm">Machine :</label>
            <select id="machine_addForm" required>
                <option value="">Select Machine</option>
                <!-- machines will be inserted by js -->
            </select>

            <!-- Imput item -->
            <label for="item_addForm">Item :</label>
            <select id="item_addForm" required>
                <option value="">Select Item</option>
                <!-- Items will be inserted by js -->
            </select>

            <!-- Imput boost -->
            <label for="boost_addForm">Boost (%)</label>
            <input type="number" id="boost_addForm_n" name="boost_addForm_n" min="0" max="100" value="100" required>
            <input type="range"  id="boost_addForm_r" name="boost_addForm_r" min="0" max="100" value="100" required>

            <!-- Imput slug -->
            <label for="slugg_addForm">Slug :</label>
            <input type="number" id="slug_addForm" name="slug_addForm" min="0" max="3" value="0" required>

            <label for="result_addForm">Result (per minute): </label>
            <span id="result_addForm">--</span>

            <br>

            <!-- Submit button -->
            <button type="submit" id="addMine_button">Add Mine</button>
        </form>
    </section>

    <section id="actualData">
        <div id="mine_list">
            <h2> List of all mine</h2>
        </div>
        <div id="item_list">
            <!-- item list added using js -->
        </div>
        <div>
            <h2> Total consumption</h2>
            <span class="total">Total consumption = <span id="conso_text"></span>MW</span>
            <div id="conso_graph">
            </div>
        </div>
    </section>

    <section id="modal">
        <div id="edit">
            <span class="close" id="closeEdit">&times;</span>
            <h2> Edit this mine</h2>
            <form id="editForm">
            <!-- Input name -->
            <label for="name_editForm">Mine name :</label>
            <input type="text" id="name_editForm" name="name_editForm" required>

            <!-- Input quality -->
            <label for="quality_editForm">Mine quality :</label>
            <select id="quality_editForm" required>
                <option value="">Select quality</option>
                <option value="1">Impure</option>
                <option value="2">Normal</option>
                <option value="4">Pure</option>
            </select>

            <!-- Imput machine -->
            <label for="machine_editForm">Machine :</label>
            <select id="machine_editForm" required>
                 <option value="">Select Machine</option>
                <!-- machines will be inserted by js -->
            </select>

            <!-- Imput item -->
            <label for="item_editForm">Item :</label>
            <select id="item_editForm" required>
                <option value="">Select Item</option>
                <!-- items will be inserted by js -->
            </select>

            <!-- Imput boost -->
            <label for="boost_editForm">Boost (%)</label>
            <input type="number" id="boost_editForm_n" name="boost_editForm_n" min="0" max="100" value="100" required>
            <input type="range"  id="boost_editForm_r" name="boost_editForm_r" min="0" max="100" value="100" required>

            <!-- Imput slug -->
            <label for="slugg_editForm">Slug :</label>
            <input type="number" id="slug_editForm" name="slug_editForm" min="0" max="3" value="0" required>

            <label for="result_editForm">Result (per minute): </label>
            <span id="result_editForm">--</span>

            <br>

            <!-- Submit button -->
            <button type="submit" id="editMine_button">Save change</button>
        </div>
        <div id="error" class="modal error">Remplish all zones
        </div>
        <div id="add_done" class="modal success">Mine added
        </div>
        <div id="edit_done" class="modal success">Mine edited
        </div>
        <div id="delete_done" class="modal success">Mine deleted
        </div>
    </section>
    </body>
</html>