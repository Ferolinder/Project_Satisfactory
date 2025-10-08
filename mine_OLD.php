<?php
    $PageTitle="Mine_OLD";

    function customPageHeader(){?>
    <meta name="description" content="Mine page to view and edit mining operations">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/ajax.js" defer></script>
    <script src="js/mine_OLD.js" defer></script>
    <script src="js/common.js" defer></script>
    <?php }

    include_once('./php/inject/header.php');
?>

    <p>Mine page to view and edit mining operations</p>
    <section id="ActualData">
    <div id="AllProducedItem">
      <h2>All Item</h2>
      <table id="itemTable">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Produced</th>
          </tr>
        </thead>
        <tbody id="itemTableBody">
          <!-- Data will be populated by Javascript -->
        </tbody>
      </table>
    <div id="AllMine">  
    <h2>All Mines</h2>
      <table id="mineTable">
        <thead>
            <tr>
              <th>Mine Name</th>
              <th>Item Name</th>
              <th>Machine Name</th>
              <th>Quality</th>
              <th>Boost (%)</th>
              <th>Slug</th>
              <th>Result</th>
            </tr>
        </thead>
        <tbody id="mineTableBody">
          <!-- Data will be populated here by JavaScript -->
        </tbody>
    </table>
    </div>
    </section>
    <section id="AddData">
      <h2>Add Mine</h2>
      <form id="AddMineForm">
        <!-- input fields for mine data -->
        <label for="name_mi_addForm">Mine Name:</label>
        <input type="text" id="name_mi_addForm" name="name_mi" required>

        <label for="quality_addForm">Quality :</label>
        <select id="quality_addForm" required>
          <option value="">Select quality</option>
          <option value="1">Impure</option>
          <option value="2">Normal</option>
          <option value="4">Pure</option>
        </select>

        <label for="id_m_addForm">Machine :</label>
        <select id="machineSelect_addForm" required>
        </select>

        <label for="id_i_addForm">Item :</label>
        <select id="itemSelect_addForm" required>
        </select>

        <label for="boost_addForm">Boost (%):</label>
        <input type="range" id="boost_addForm" name="boost_addForm" min="0" max="100" value="100" oninput="boostOutput_addForm.value = boost_addForm.value">
        <output id="boostOutput_addForm" for="boost_addForm">100</output>

        <label for="slug_addForm">Slug:</label>
        <input type="number" max="3" min="0" id="slug_addForm" name="slug_addForm" required value="0">
        
        <br>

        <label for="result_addForm">Result (per minute): <span id="result_addForm">--</span></label>

        <br>

        <button type="submit">Add Mine</button>
      </form>
  </body>
  <modals id="modals">
    <!-- Modal for editing mine -->
    <div id="editMineModal" class="modal" style="display:none;">
      <div class="modal-content">
        <span class="close" id="closeEditModal">&times;</span>
        <h2>Edit Mine</h2>
        <form id="EditMineForm">
          <!-- input fields for editing mine data -->
          <label for="name_mi_editForm">Mine Name:</label>
          <input type="text" id="name_mi_editForm" name="name_mi_editForm" required>
          <label for="quality_editForm">Quality:</label>
          <select id="quality_editForm" name="quality_editForm" required>
            <option value="1">Impure</option>
            <option value="2">Normal</option>
            <option value="4">Pure</option>
          </select>
          <label for="name_ma_editForm">Machine :</label>
          <select id="machineSelect_editForm" name="name_ma_editForm" required>
          </select>
          <label for="name_i_editForm">Item :</label>
          <select id="itemSelect_editForm" name="name_i_editForm" required>
          </select>
          <label for="boost_editForm">Boost (%):</label>
          <input type="range" id="boost_editForm" name="boost_editForm" min="0" max="100" value="100" oninput="boostOutput_editForm.value = boost_editForm.value">
          <output id="boostOutput_editForm" for="boost_editForm">100</output>
          <label for="slug_editForm">Slug:</label>
          <input type="number" max="3" min="0" id="slug_editForm" name="slug_editForm" required value="0">
          <br>
          <label for="result_editForm">Result (per minute): <span id="result_editForm">--</span></label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  </modals>
</html>