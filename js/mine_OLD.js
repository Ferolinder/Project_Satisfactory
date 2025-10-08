// console.log("mine.js loaded");

// Setting value to default on load
document.getElementById('slug_addForm').value = "0";
document.getElementById('name_mi_addForm').value = "";
document.getElementById('quality_addForm').value="";
document.getElementById('boost_addForm').value=100;
ajaxRequest('GET', 'php/request.php', addItemToSelect, 'action=getItemsMine');
ajaxRequest('GET', 'php/request.php', addMachineToSelect, 'action=getMachineMines');
ajaxRequest('GET','php/request.php',printMineData,'action=getMine');

// Load item data from the server
function addItemToSelect(item){
    //console.log(item);

    //Recap table
    let itemTable = document.getElementById('itemTableBody');
    itemTable.innerHTML = '';

    //Add form
    let selectAdd = document.getElementById('itemSelect_addForm');
    selectAdd.innerHTML = '<option value="">Select an item</option>'; // Clear existing 
    
    //Edit form
    let selectEdit = document.getElementById('itemSelect_editForm')
    selectEdit.innerHTML = '<option value="">Select an item</option>'; // Clear existing 

    item.forEach((it) => {
        // Adding the item to the table
        let row = document.createElement('tr');
        let td_name_i = document.createElement('td');
        let td_qtt_i_p = document.createElement('td');
        row.dataset.id_i = it.id_i;
        td_name_i.textContent= it.name_i;
        td_qtt_i_p.textContent = "0";
        row.appendChild(td_name_i);
        row.appendChild(td_qtt_i_p);
        itemTable.appendChild(row);

        // Adding the item in the add form
        let optionAdd = document.createElement('option');
        optionAdd.value = it.id_i;
        optionAdd.text = it.name_i;
        optionAdd.dataset.extractionMethod = it.extraction_method;
        selectAdd.add(optionAdd);

        // Adding the item to the edit form
        let optionEdit = document.createElement('option');
        optionEdit.value = it.id_i
        optionEdit.text = it.name_i;
        optionEdit.dataset.extractionMethod = it.extraction_method;
        selectEdit.add(optionEdit);
    });
}

// Load machine data from the server
function addMachineToSelect(machine){
    //console.log(machine);
    // add form
    let selectAdd = document.getElementById('machineSelect_addForm');
    selectAdd.innerHTML = '<option value="">Select a machine</option>'; // Clear existing options

    //edit form
    let selectEdit = document.getElementById('machineSelect_editForm');
    selectEdit.innerHTML = '<option value="">Select a machine</option>'; // Clear existing options

    machine.forEach((mac) => {
        let optionAdd = document.createElement('option');
        let optionEdit = document.createElement('option');

        optionAdd.value = mac.id_ma;
        optionEdit.value = mac.id_ma;

        optionAdd.text = mac.name_ma;
        optionEdit.text = mac.name_ma;
        
        optionAdd.dataset.exitType = mac.exit_type;
        optionEdit.dataset.exitType = mac.exit_type;

        optionAdd.dataset.naturalBoost = mac.natural_boost;
        optionEdit.dataset.naturalBoost = mac.natural_boost;

        selectAdd.add(optionAdd);
        selectEdit.add(optionEdit);
    });
}

// Printing all mine Data 
function printMineData(data) {
    //console.log(data);
    // Clear existing table and rows stocked in ActualData
    let tableBody = document.getElementById('mineTableBody');
    tableBody.innerHTML = '';

    // Empty itemTable
    emptyItemTable();

    data.forEach((mine) => {
        let itemTableRows = document.getElementById('itemTableBody').getElementsByTagName('tr');
        for (let row of itemTableRows) {
            if (row.dataset.id_i == mine.id_i && Number(row.children[1].textContent)==0) {
                let qttCell = row.children[1];
                qttCell.textContent = (Number(qttCell.textContent) + Number(mine.qtt_p)).toString();
                break;
            }
        }

        let row = document.createElement('tr');

        let nameCell = document.createElement('td');
        nameCell.textContent = mine.name_mi;
        row.appendChild(nameCell);

        let itemNameCell = document.createElement('td');
        itemNameCell.textContent = mine.name_i;
        row.appendChild(itemNameCell);

        let machineNameCell = document.createElement('td');
        machineNameCell.textContent = mine.name_ma;
        row.appendChild(machineNameCell);

        let qualityCell = document.createElement('td');
        switch (mine.quality) {
            case 1:
                qualityCell.textContent = "impure";
                qualityCell.value="0";
                break;
            case 2 :
                qualityCell.textContent = "normal";
                qualityCell.value="1";
                break;
            case 4 : 
                qualityCell.textContent = "pure";
                qualityCell.value="2";
                break;
            default : 
                console.log("Error, quality does not exist");
        }
        row.appendChild(qualityCell);

        let boostCell = document.createElement('td');
        boostCell.textContent = mine.boost + '%';
        row.appendChild(boostCell);

        let slugCell = document.createElement('td');
        slugCell.textContent = mine.slug;
        row.appendChild(slugCell);

        let resultCell = document.createElement('td');
        resultCell.textContent = calculResult(mine.boost,mine.quality,mine.natural_boost)
        row.appendChild(resultCell);

        //Adding edit and delete buttons
        let actionCell = document.createElement('td');

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', openEditModal.bind(null, row, mine.id_mi));
        actionCell.appendChild(editButton);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.mineId = mine.id_mi;
        deleteButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this mine?')) {
                console.log("Deleting mine ID:", mine.id_mi);
                ajaxRequest('DELETE', 'php/request.php', printMineData, 
                    'action=deleteMine'+
                    '&id_mi='+mine.id_mi
                );
            }
        });
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        tableBody.appendChild(row);
    }); 
}

//===================== Updating Add form ===================== \\
let addMineForm             = document.getElementById('AddMineForm');
let name_mi_addForm         = document.getElementById("name_mi_addForm");
let quality_addForm         = document.getElementById("quality_addForm");
let itemSelect_addForm      = document.getElementById("itemSelect_addForm");
let machineSelect_addForm   = document.getElementById("machineSelect_addForm");
let boost_addForm           = document.getElementById("boost_addForm");
let boostOutput_addForm     = document.getElementById("boostOutput_addForm");
let slug_addForm            = document.getElementById("slug_addForm");
let result_addForm          = document.getElementById("result_addForm"); 

// Boost range available modification using slugs
slug_addForm.addEventListener('input', function() {
    updateBoost(boost_addForm, boostOutput_addForm, slug_addForm);
});

// Update selector on change 
// updating machine list when item is selected
itemSelect_addForm.addEventListener('change',function(){
    updateMachineList(itemSelect_addForm, machineSelect_addForm);
});

// updating item list when machine is selected
machineSelect_addForm.addEventListener('change',function(){
    updateItemList(itemSelect_addForm, machineSelect_addForm);
});

// Calculating result
boost_addForm.addEventListener('input', function() {
    checkCalculPossibility(boost_addForm, machineSelect_addForm, quality_addForm, result_addForm);
});
machineSelect_addForm.addEventListener('change', function() {
    checkCalculPossibility(boost_addForm, machineSelect_addForm, quality_addForm, result_addForm);
});
quality_addForm.addEventListener('change', function() {
    checkCalculPossibility(boost_addForm, machineSelect_addForm, quality_addForm, result_addForm);
});
slug_addForm.addEventListener('change', function() {
    checkCalculPossibility(boost_addForm, machineSelect_addForm, quality_addForm, result_addForm);
});

// Form sumbission 
document.getElementById('AddMineForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Send form data to the server 

    // Find the current quantity stocked for the selected item
    let current_qtt_p = 0;
    let selectedItemId = itemSelect_addForm.selectedOptions[0].value;
    let itemTableRows = document.getElementById('itemTableBody').getElementsByTagName('tr');
    for (let row of itemTableRows) {
        if (row.dataset.id_i === selectedItemId) {
            let qttCell = row.children[1];
            current_qtt_p = parseInt(qttCell.textContent) || 0;
            break;
        }
    }


    ajaxRequest('POST', 'php/request.php', printMineData, 
        'action=addMine'+
        '&name_mi='+encodeURIComponent(name_mi_addForm.value)+
        '&quality='+encodeURIComponent(quality_addForm.selectedOptions[0].value)+
        '&id_i='+encodeURIComponent(itemSelect_addForm.selectedOptions[0].value)+
        '&id_ma='+encodeURIComponent(machineSelect_addForm.selectedOptions[0].value)+
        '&boost='+encodeURIComponent(boost_addForm.value)+
        '&slug='+encodeURIComponent(slug_addForm.value)+
        '&current_qtt_p='+encodeURIComponent(current_qtt_p)+
        '&old_qtt_p='+encodeURIComponent(0)+
        '&new_qtt_p='+encodeURIComponent(result_addForm.innerHTML)
    );
});

//===================== Modal Function =====================\\ 
//Edit button functionality
function openEditModal(row, mineId) {
    // taking the data from the row
    let name_mi = row.children[0].textContent;
    let itemName = row.children[1].textContent;
    let machineName = row.children[2].textContent;
    let quality = row.children[3].value;
    let boost = parseInt(row.children[4].textContent);
    let slug = parseInt(row.children[5].textContent);
    let result = parseInt(row.children[6].textContent);

    // Setting the data in the modal
    document.getElementById('name_mi_editForm').value = name_mi;
    document.getElementById('boost_editForm').value = boost;
    document.getElementById('slug_editForm').value = slug;

    //Make the modal visible
    document.getElementById('editMineModal').style.display = 'block';

    // Set max for boost based on slug
    let boostInput = document.getElementById('boost_editForm');
    boostInput.max = 100 + slug * 50;

    // Set selected quality
    let qualitySelect = document.getElementById('quality_editForm');
    qualitySelect.selectedIndex = quality


    // Set selected item
    let itemSelect = document.getElementById('itemSelect_editForm');
    for (let i = 0; i < itemSelect.options.length; i++) {
        if (itemSelect.options[i].text === itemName) {
            itemSelect.selectedIndex = i;
            break;
        }
    }

    // Set selected machine
    let machineSelect = document.getElementById('machineSelect_editForm');
    for (let i = 0; i < machineSelect.options.length; i++) {
        if (machineSelect.options[i].text === machineName) {
            machineSelect.selectedIndex = i;
            break;
        }
    }

    // Set calculated value 
    document.getElementById('result_editForm').innerHTML=result;
    document.getElementById('result_editForm').dataset.originalResult=result;

    // Show the modal
    let modal = document.getElementById('editMineModal');
    modal.style.display = 'block';

    // Handle form submission
    document.getElementById('EditMineForm').addEventListener('submit',function(event) {
        event.preventDefault(); // Prevent the default form submission
        updateMineData(mineId);
    }); 
}

let editMineForm             = document.getElementById('EditMineForm');
let name_mi_editForm         = document.getElementById("name_mi_editForm");
let quality_editForm         = document.getElementById("quality_editForm");
let itemSelect_editForm      = document.getElementById("itemSelect_editForm");
let machineSelect_editForm   = document.getElementById("machineSelect_editForm");
let boost_editForm           = document.getElementById("boost_editForm");
let boostOutput_editForm     = document.getElementById("boostOutput_editForm");
let slug_editForm            = document.getElementById("slug_editForm");
let result_editForm          = document.getElementById("result_editForm"); 

// Boost range available modification using slugs
slug_editForm.addEventListener('input', function() {
    updateBoost(boost_editForm, boostOutput_editForm, slug_editForm);
});

// Update selector on change 
// updating machine list when item is selected
itemSelect_editForm.addEventListener('change',function(){
    updateMachineList(itemSelect_editForm, machineSelect_editForm);
});

// updating item list when machine is selected
machineSelect_editForm.addEventListener('change',function(){
    updateItemList(itemSelect_editForm, machineSelect_editForm);
});

// Calculating result
boost_editForm.addEventListener('input', function() {
    checkCalculPossibility(boost_editForm, machineSelect_editForm, quality_editForm, result_editForm);
});
machineSelect_editForm.addEventListener('change', function() {
    checkCalculPossibility(boost_editForm, machineSelect_editForm, quality_editForm, result_editForm);
});
quality_editForm.addEventListener('change', function() {
    checkCalculPossibility(boost_editForm, machineSelect_editForm, quality_editForm, result_editForm);
});
slug_editForm.addEventListener('change', function() {
    checkCalculPossibility(boost_editForm, machineSelect_editForm, quality_editForm, result_editForm);
});

// Updating the database 
function updateMineData(id_mine){
    // Get the current quantity 
    let itemTableRows = document.getElementById('itemTableBody').getElementsByTagName('tr');
    for (let row of itemTableRows) {
        if (row.dataset.id_i === itemSelect_editForm.selectedOptions[0].value) {
            let qttCell = row.children[1];
            current_qtt_p = parseInt(qttCell.textContent);
            break;
        }
    }

    ajaxRequest('PUT', 'php/request.php', printMineData, 
        'action=updateMine'+
        '&name_mi='+encodeURIComponent(name_mi_editForm.value)+
        '&quality='+encodeURIComponent(quality_editForm.selectedOptions[0].value)+
        '&id_i='+encodeURIComponent(itemSelect_editForm.selectedOptions[0].value)+
        '&id_ma='+encodeURIComponent(machineSelect_editForm.selectedOptions[0].value)+
        '&boost='+encodeURIComponent(boost_editForm.value)+
        '&slug='+encodeURIComponent(slug_editForm.value)+
        '&id_mi='+encodeURIComponent(id_mine)+
        '&current_qtt_p='+encodeURIComponent(current_qtt_p)+
        '&old_qtt_p='+encodeURIComponent(result_editForm.dataset.originalResult)+
        '&new_qtt_p='+encodeURIComponent(result_editForm.innerHTML)
    );
    emptyItemTable();
    console.log("Successfull update");
}

// Closing modal system
document.getElementById("closeEditModal").addEventListener('click', function(){
    document.getElementById('editMineModal').style="display:none";
});

//===================== General function =====================\\

function checkCalculPossibility(boost,machine,quality,resultArea){
    if(boost.value =="" || machine.selectedOptions[0].value==""  || quality.selectedOptions[0].value==""){
        resultArea.innerHTML="--";
    }
    else{
        result = calculResult(
            boost.value,
            quality.selectedOptions[0].value,
            machine.selectedOptions[0].dataset.naturalBoost
        );
        resultArea.innerHTML=result;
    }
}

function calculResult(boost, quality, naturalMachineBoost){
    /* Elements :
        - boosts    : describe how much the machine is currently boosted
        - quality   : give the quality of the ore extracted (1-4)
        - naturalMachineBoost : give the boost the machine naturally have  
    */
    return (30*quality*naturalMachineBoost*(boost/100)).toFixed(2);
}

function updateBoost(boost, boostOutput, slugSelect){
    /*
        Adapt the boost maximum to the number of slug selected
        - boost     : element that contain the boost
        - slugSelect: element that contain the slug 
    */

    let slugValue = parseInt(slugSelect.value);
    let boostInput = boost;
    // let boostOutput = document.getElementById('boostOutput');
    
    if (isNaN(slugValue) || slugValue < 0) {
        slugValue = 0;
    }
    
    // Update max boost based on slug value
    boostInput.max = 100 + slugValue * 50;
    boostOutput.value = boostInput.value;
    
    // If current boost exceeds new max, adjust it
    if (parseInt(boostInput.value) > boostInput.max) {
        boostInput.value = boostInput.max;
        boostOutput.value = boostInput.value;
    }
}

function updateItemList(itemList, machineSelect){
    /*
        Adapt the item selector to the machine depending on their type 
        - itemList      : element that contain the list 
        - machineSelect : element that contain the machine
    */    
    //If no machine selected enable all options and exit
    if(machineSelect.value === "") {
        Array.from(itemList.options).forEach(option => {
            option.hidden= false;
        });
        return;
    }

    if(itemList.value != "") {
        if(machineSelect.selectedOptions[0].dataset.exitType == itemList.selectedOptions[0].dataset.extractionMethod) {
            return; // Compatible, do nothing
        }

    }
    // console.log("Incompatible selection, filtering items");
    // Enable all options first
    Array.from(itemList.options).forEach(option => {
        option.hidden= false;
    });
    itemList.value = ""; // Reset selection
    
    let exitType = machineSelect.selectedOptions[0].dataset.exitType;
    if (exitType) {
        Array.from(itemList.options).forEach(option => {
            if (option.dataset.extractionMethod !== exitType) {
                option.hidden = true;
            }
        });
    }    
}

function updateMachineList(itemSelect, machineList){
    /*
        Adapt the item selector to the machine depending on their type 
        - itemSelect    : element that contain the list 
        - machineList   : element that contain the machine
    */
    //verrifying if the selected item is compatible with the selected machine
    //If no item selected enable all options and exit
    if(itemSelect.value === "") {
        Array.from(machineList.options).forEach(option => {
            option.hidden= false;
        });
        return;
    }

    if(machineList.value != "") {
        if(itemSelect.selectedOptions[0].dataset.extractionMethod == machineList.selectedOptions[0].dataset.exitType) {
            return; // Compatible, do nothing
        }

    }
    // console.log("Incompatible selection, filtering machines");
    // Enable all options first
    Array.from(machineList.options).forEach(option => {
        option.hidden= false;
    });
    machineList.value = "";

    let extractionMethod = itemSelect.selectedOptions[0].dataset.extractionMethod;
    if (extractionMethod) {
        Array.from(machineList.options).forEach(option => {
            if (option.dataset.exitType !== extractionMethod) {
                option.hidden = true;
            }
        });
    }
}

function emptyItemTable(){
    let itemTableRows = document.getElementById('itemTableBody').getElementsByTagName('tr');
    for (let row of itemTableRows) {
        let qttCell = row.children[1];
        qttCell.innerHTML=  0;
    }
}

