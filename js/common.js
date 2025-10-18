console.log("common.js loaded ");

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

export { showModal, hideModal };