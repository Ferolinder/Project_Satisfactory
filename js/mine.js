// Classic id places

// -- item list
let item_list = document.getElementById("item_list")

// -- mine list
let mine_list = document.getElementById("mine_list");

// -- addForm
let name_addForm    =   document.getElementById("name_addForm");
let qual_addForm    =   document.getElementById("quality_addForm");
let mach_addForm    =   document.getElementById("machine_addForm");
let item_addForm    =   document.getElementById("item_addForm");
let boost_addForm_n =   document.getElementById("boost_addForm_n");
let boost_addForm_r =   document.getElementById("boost_addForm_r");
let slug_addForm    =   document.getElementById("slug_addForm");
let result_addForm  =   document.getElementById("result_addForm");
let addMine_button  =   document.getElementById("addMine_button");

// -- editForm
let name_editForm   =   document.getElementById("name_editForm");
let qual_editForm   =   document.getElementById("quality_editForm");
let mach_editForm   =   document.getElementById("machine_editForm");
let item_editForm   =   document.getElementById("item_editForm");
let boost_editForm_n=   document.getElementById("boost_editForm_n");
let boost_editForm_r=   document.getElementById("boost_editForm_r");
let slug_editForm   =   document.getElementById("slug_editForm");
let result_editForm =   document.getElementById("result_editForm");
let editMine_button =   document.getElementById("editMine_button");

// -- Modals
let closeEdit       = document.getElementById('closeEdit');

let editModal       = document.getElementById('edit');
let errorModal      = document.getElementById('error');
let addDoneModal    = document.getElementById('add_done');
let editDoneModal   = document.getElementById('edit_done');
let deleteDoneModal = document.getElementById('delete_done');

// -- Graph conso 
let conso_text      = document.getElementById('conso_text');
let conso_graph     = document.getElementById('conso_graph');

// Set the page to default setting

// -- Clear conso 
clearConso();

// -- Get mines

// -- Get items 
ajaxRequest('GET', 'php/request.php', 
    function(data){
        updateItemList(data),
        setConsoGraph(data);
        addOptionSelect(item_addForm, data);
        addOptionSelect(item_editForm, data);
    },
    'action=get_primary_item'
);

ajaxRequest('GET', 'php/request.php', updateMineList, 
    'action=get_mine'
);

// -- Get machines
ajaxRequest('GET', 'php/request.php', function(data){
    addOptionSelect(mach_addForm, data);
    addOptionSelect(mach_editForm, data);
    }, 
    'action=get_extractor_machine'
);

// -- Make add form
name_addForm.value      = "";
qual_addForm.value      = "";
boost_addForm_n.value   = 100;
boost_addForm_r.value   = 100;

// -- Make edit form

// -- Hide modals
hideModal(editModal);
hideModal(errorModal);
hideModal(addDoneModal);
hideModal(editDoneModal);
hideModal(deleteDoneModal);




// Add form function 

// -- Change boost using slugs
slug_addForm.addEventListener('input', function(){
    updateBoost(slug_addForm, boost_addForm_n, boost_addForm_r, 'slug');
});
boost_addForm_n.addEventListener('input', function(){
    updateBoost(slug_addForm, boost_addForm_n, boost_addForm_r, 'boost_n');
});
boost_addForm_r.addEventListener('input', function(){
    updateBoost(slug_addForm, boost_addForm_n, boost_addForm_r, 'boost_r');
});

// -- Update machine selector on item select
item_addForm.addEventListener('change', function() {
    updateSelect(item_addForm, mach_addForm);
});

// -- Update item selector on machine select
mach_addForm.addEventListener('change',function(){
    updateSelect(mach_addForm, item_addForm)
});

// -- Calculating result 
qual_addForm.addEventListener('change',function(){
    calculatingResult(qual_addForm,mach_addForm,boost_addForm_n,result_addForm);
});
mach_addForm.addEventListener('change',function(){
    calculatingResult(qual_addForm,mach_addForm,boost_addForm_n,result_addForm);
});
boost_addForm_n.addEventListener('input',function(){
    calculatingResult(qual_addForm,mach_addForm,boost_addForm_n,result_addForm);
});
boost_addForm_r.addEventListener('input',function(){
    calculatingResult(qual_addForm,mach_addForm,boost_addForm_n,result_addForm);
});


// -- Form submission
addMine_button.addEventListener('click', function(event){
    event.preventDefault(); // Prevent the default form submission
    if(name_addForm.value!="" && 
        qual_addForm.selectedOptions[0].value!="" && 
        mach_addForm.selectedOptions[0].value!="" &&
        item_addForm.selectedOptions[0].value!="" 
    ){
        ajaxRequest('POST', 'php/request.php', function(data){
            clearConso();
            ajaxRequest('GET', 'php/request.php', function(data){
                updateItemList(data);
            },'action=get_primary_item');
            updateMineList(data);
            showModal(addDoneModal, "500");
        }, 
        'action=add_mine' +
            '&name='+       encodeURIComponent(name_addForm.value) +
            '&quality='+    encodeURIComponent(qual_addForm.selectedOptions[0].value) +
            '&machine='+    encodeURIComponent(mach_addForm.selectedOptions[0].value) +
            '&item='+       encodeURIComponent(item_addForm.selectedOptions[0].value) +
            '&boost='+      encodeURIComponent(boost_addForm_n.value) +
            '&slug='+       encodeURIComponent(slug_addForm.value) +
            '&result='+     encodeURIComponent(result_addForm.innerHTML) 
        );
    }
    else{
        showModal(errorModal, "500");
    }
});


// Edit form function

// -- Modal function 

// -- -- Close modal 
closeEdit.addEventListener('click', function(event){
    event.preventDefault();
    hideModal(editModal);
});

// -- Update form by conditions (modal)

// -- -- Change boost using slugs
slug_editForm.addEventListener('input', function(){
    updateBoost(slug_editForm, boost_editForm_n, boost_editForm_r, 'slug');
});
boost_editForm_n.addEventListener('input', function(){
    updateBoost(slug_editForm, boost_editForm_n, boost_editForm_r, 'boost_n');
});
boost_editForm_r.addEventListener('input', function(){
    updateBoost(slug_editForm, boost_editForm_n, boost_editForm_r, 'boost_r');
});

// -- -- Update machine selector on item select
item_editForm.addEventListener('change', function() {
    updateSelect(item_editForm, mach_editForm);
});

// -- -- Update item selector on machine select
mach_editForm.addEventListener('change',function(){
    updateSelect(mach_editForm, item_editForm)
});

// -- -- Calculating result 
qual_editForm.addEventListener('change',function(){
    calculatingResult(qual_editForm,mach_editForm,boost_editForm_n,result_editForm);
});
mach_editForm.addEventListener('change',function(){
    calculatingResult(qual_editForm,mach_editForm,boost_editForm_n,result_editForm);
});
boost_editForm_n.addEventListener('input',function(){
    calculatingResult(qual_editForm,mach_editForm,boost_editForm_n,result_editForm);
});
boost_editForm_r.addEventListener('input',function(){
    calculatingResult(qual_editForm,mach_editForm,boost_editForm_n,result_editForm);
});

// -- -- Edit submission
editMine_button.addEventListener('click', function(event){
    event.preventDefault(); // Prevent the default form submission
    if(name_editForm.value!="" && 
        qual_editForm.selectedOptions[0].value!="" && 
        mach_editForm.selectedOptions[0].value!="" &&
        item_editForm.selectedOptions[0].value!="" 
    ){
        ajaxRequest('PUT', 'php/request.php', function(data){
            clearConso();
            ajaxRequest('GET', 'php/request.php', 
                function(data){
                updateItemList(data);
            },
                'action=get_primary_item'
            );
            updateMineList(data);
            hideModal(editModal);
            showModal(editDoneModal, "500");
        }, 
        'action=edit_mine' +
            '&id_mi='+     encodeURIComponent(editMine_button.dataset.mineId) +
            '&name='+      encodeURIComponent(name_editForm.value) +
            '&quality='+   encodeURIComponent(qual_editForm.selectedOptions[0].value) +
            '&machine='+   encodeURIComponent(mach_editForm.selectedOptions[0].value) +
            '&item='+      encodeURIComponent(item_editForm.selectedOptions[0].value) +
            '&boost='+     encodeURIComponent(boost_editForm_n.value) +
            '&slug='+      encodeURIComponent(slug_editForm.value) +
            '&new_result='+    encodeURIComponent(result_editForm.innerHTML) +
            '&previous_result='+ encodeURIComponent(editMine_button.dataset.previousProd)
        );
    }
    else{
        showModal(errorModal, "500");
    }
});


// Basic function 

// -- Calculating result 
function calculatingResult(quality, mach, boost, resultArea){
    if(quality.selectedOptions[0].value!="" && mach.selectedOptions[0].value!=""){
        let quality_v   = quality.selectedOptions[0].value;
        let mach_v      = mach.selectedOptions[0].dataset.naturalBoost; 
        let boost_v     = boost.value;

        result = ((boost_v/100)*(30*quality_v*mach_v)).toFixed(2);
        resultArea.innerHTML=result;
    }
    else{
        resultArea.innerHTML='--';
    }
}

// -- Updating boost 
function updateBoost(slugValue, boost_n, boost_r, caseType){
    switch (caseType) {
        case 'slug':
            boostMax = 100+50*slugValue.value;
            boost_n.max = boostMax;
            boost_r.max = boostMax;
            if (boost_n.value > boostMax){
                boost_n.value = boostMax;
            }
            if (boost_r.value > boostMax){
                boost_r.value = boostMax;
            }
            break;
        case 'boost_n':
            boost_r.value=boost_n.value;
            break;
        case 'boost_r':
            boost_n.value=boost_r.value;
            break;
        default:
            break;
    }
}

// -- Update item list
function updateItemList(data){
    item_list.innerHTML="<h2> List of all items </h2>";
    data.forEach(item => {
        // Add it to the graph 
        let span = document.createElement('span');
        span.textContent = `${item['name_i']}: ${item['qtt_p']}`;
        span.dataset.id = item['id_i']; // Add the item id to the dataset
        item_list.appendChild(span);
        item_list.appendChild(document.createElement('br'));
    });
}

// -- Update mine list
function updateMineList(data){
    mine_list.innerHTML="";
    data.forEach(mine => {
        // Update consumption graph
        updateConso(mine);

        // Create a container for the mine entry
        let container = document.createElement('div');
        
        // Name of the mine
        let nameSpan = document.createElement('span');
        nameSpan.textContent = `Mine: ${mine['name_mi']}`;
        nameSpan.dataset.id = mine['id_mi'];
        container.appendChild(nameSpan);
        container.appendChild(document.createElement('br'));
        
        // Item produced
        let itemSpan = document.createElement('span');
        itemSpan.textContent = `Item: ${mine['name_i']}`;
        itemSpan.dataset.id = mine['id_i_mi'];
        container.appendChild(itemSpan);
        container.appendChild(document.createElement('br'));

        // Machine used
        let machineSpan = document.createElement('span');
        machineSpan.textContent = `Machine: ${mine['name_ma']}`;
        machineSpan.dataset.id = mine['id_ma'];
        container.appendChild(machineSpan);
        container.appendChild(document.createElement('br'));
        
        // Quantity produced
        let qttSpan = document.createElement('span');
        let qtt = 30 * Number(mine['quality']) * Number(mine['natural_boost']) * (Number(mine['boost']) / 100);
        qttSpan.textContent = `Quantity: ${qtt}/min`;
        container.appendChild(qttSpan);
        container.appendChild(document.createElement('br'));
        
        // Quality
        let qualitySpan = document.createElement('span');
        let qualityText = '';
        switch (mine['quality']) {
            case "1":
            case 1:
            qualityText = "Impure";
            break;
            case "2":
            case 2:
            qualityText = "Normal";
            break;
            case "4":
            case 4:
            qualityText = "Pure";
            break;
            default:
            qualityText = "Unknown";
        }
        qualitySpan.textContent = `Quality: ${qualityText}`;
        container.appendChild(qualitySpan);
        container.appendChild(document.createElement('br'));
        
        // Consumption
        let consoSpan = document.createElement('span');
        consoSpan.textContent = `Consumption: ${mine['conso']}`;
        container.appendChild(consoSpan);
        container.appendChild(document.createElement('br'));
        
        // Append the container to the mine list
        // Edit button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-mine-btn';
        editButton.dataset.mineId = mine['id_mi'];
        editButton.addEventListener('click', function(){
            fillEditModal(mine);
            showModal(editModal,Infinity);
        })
        container.appendChild(editButton);

        // Delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-mine-btn';
        deleteButton.dataset.mineId = mine['id_mi'];
        deleteButton.addEventListener('click', function(){
            if(confirm("Do you really want to delete this mine ?")){
                ajaxRequest('DELETE', 'php/request.php',function(data){
                    clearConso();
                    updateMineList(data);
                    ajaxRequest('GET', 'php/request.php', function(data){
                        updateItemList(data);
                    },'action=get_primary_item');
                    showModal(deleteDoneModal, "500");
                },
                'action=delete_mine' + 
                '&id_mi=' + mine['id_mi'] + 
                '&id_i=' + mine['id_i_mi']+
                '&mine_prod=' + qtt
            );
            }
        })
        container.appendChild(deleteButton);

        mine_list.appendChild(container);
        
    });
    drawGraph();
}

// -- Adding select options 
function addOptionSelect(select, data){
    data.forEach(element => {
        let option = document.createElement("option");
        if (element['id_i'] != null) {
            option.value = element['id_i'];
            option.dataset.type = element['type_i'];
            option.textContent = element['name_i'];
        } else if (element['id_ma'] != null) {
            option.value = element['id_ma'];
            option.dataset.type = element['output_type'];
            option.dataset.naturalBoost = element['natural_boost'];
            option.textContent = element['name_ma'];
        } else {
            // Skip if neither id is present
            return;
        }
        select.appendChild(option);
    });
}

// -- Update machine select 
function updateSelect(entry, exit){
    if(entry.value==""){
        Array.from(exit.options).forEach(option =>{
            option.hidden=false;
        });
    }
    else{
        
        // get the entry data type
        entry_type = entry.selectedOptions[0].dataset.type;
        
        //get the option of the exit
        exit_option = Array.from(exit.options);
        exit_option.forEach(option => {
            if(option.dataset.type==entry_type || option.value==""){
                // conform option
                option.hidden=false;
            }
            else{
                // non conform option
                option.hidden=true;
            }
        });
        exit_option.selectedId = "";
    }
}

// -- Hide modal
function hideModal(modal){
    modal.hidden=true;
}

// -- Show modal
function showModal(modal, time) {
    modal.hidden = false;
    if (time !== Infinity) {
        setTimeout(() => {
            modal.hidden = true;
        }, time);
    }
}

// -- Fill editModal
function fillEditModal(mine){
    console.log(mine);
    name_editForm.value        = mine['name_mi'];
    qual_editForm.value        = mine['quality'];
    boost_editForm_n.value     = mine['boost'];
    boost_editForm_r.value     = mine['boost'];
    slug_editForm.value        = mine['slug'];
    result_editForm.innerHTML  = ((mine['boost']/100)*(30*mine['quality']*mine['natural_boost'])).toFixed(2);

    // Set machine and item select
    Array.from(mach_editForm.options).forEach(option => {
        option.selected = (option.value == mine['id_ma']);
    });
    updateSelect(mach_editForm, item_editForm);
    Array.from(item_editForm.options).forEach(option => {
        option.selected = (option.value == mine['id_i_mi']);
    });

    // Update the edit button dataset with the mine id
    editMine_button.dataset.mineId = mine['id_mi'];
    editMine_button.dataset.previousProd = ((mine['boost']/100)*(30*mine['quality']*mine['natural_boost'])).toFixed(2);
}


// -- Clear conso graph and text
function clearConso(){
    conso_text.innerHTML=0;
    Array.from(conso_graph.children).forEach( item => {
        item.dataset.conso_tot=0;
    })
}

// -- set item in conso graph
function setConsoGraph(data){
    console.log("setConsoGraph called");
    data.forEach(item =>{
        let div_item = document.createElement("div");
        div_item.innerHTML          = item['name_i'];
        div_item.dataset.qtt_p      = item['qtt_p'];
        div_item.dataset.id_i       = item['id_i'];
        div_item.dataset.conso_tot  = 0;
        div_item.hidden=true;
        conso_graph.appendChild(div_item);
    })
}

// -- Update conso graph 
function updateConso(mine){
    conso_text.innerHTML = Number(conso_text.innerHTML)+ Number(mine['conso']);
    // Find the div corresponding to the item produced by this mine
    let div_item = conso_graph.querySelector(`div[data-id_i="${mine['id_i_mi']}"]`);
    if (div_item) {
        // Add this mine's consumption to the total for this item
        let currentConso = Number(div_item.dataset.cono_tot) || 0;
        div_item.dataset.conso_tot = currentConso + Number(mine['conso']);
    }
}

// -- Drawing the graph 
function drawGraph() {
    // Remove any previous SVG
    let oldSvg = conso_graph.querySelector('svg');
    if (oldSvg) oldSvg.remove();

    // Gather data from divs
    let items = Array.from(conso_graph.querySelectorAll('div[data-id_i]'));
    let total = items.reduce((sum, div) => sum + Number(div.dataset.conso_tot), 0);

    if (total === 0) return; // Nothing to draw

    // SVG setup
    const size = 200;
    const radius = size / 2 - 20;
    const center = size / 2;
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.style.display = "block";
    svg.style.margin = "0 auto";

    // Colors for slices
    const colors = [
        "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
        "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"
    ];

    let startAngle = 0;
    items.forEach((div, i) => {
        let value = Number(div.dataset.conso_tot);
        if (value === 0) return;
        let angle = (value / total) * 2 * Math.PI;
        let endAngle = startAngle + angle;

        // Calculate coordinates
        let x1 = center + radius * Math.cos(startAngle - Math.PI / 2);
        let y1 = center + radius * Math.sin(startAngle - Math.PI / 2);
        let x2 = center + radius * Math.cos(endAngle - Math.PI / 2);
        let y2 = center + radius * Math.sin(endAngle - Math.PI / 2);

        let largeArcFlag = angle > Math.PI ? 1 : 0;

        let pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
        ].join(" ");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", colors[i % colors.length]);
        path.setAttribute("stroke", "#fff");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("data-id_i", div.dataset.id_i);
        path.setAttribute("title", `${div.innerHTML}: ${value}`);

        svg.appendChild(path);

        // Optional: Add label
        let midAngle = startAngle + angle / 2;
        let labelX = center + (radius / 1.5) * Math.cos(midAngle - Math.PI / 2);
        let labelY = center + (radius / 1.5) * Math.sin(midAngle - Math.PI / 2);

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", labelX);
        text.setAttribute("y", labelY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", "12");
        text.setAttribute("fill", "#222");
        text.textContent = div.innerHTML;
        svg.appendChild(text);

        startAngle = endAngle;
    });

    conso_graph.appendChild(svg);
}

