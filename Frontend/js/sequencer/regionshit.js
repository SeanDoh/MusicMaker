// grid clicks
    // get list of all grid elements, loop through them and add event listeners
    /*
    let mouseEnteredUnclicked = false; // tracks status of mouse entering and leaving
    let gridElements = document.getElementsByClassName('grid-' + this.type);
    for (let i = 0; i < gridElements.length; i++) {
        // click listener
        gridElements[i].addEventListener('click', (e) => {
            // there's nested div inside each grid element, so need to check for that
            if (e.target.id.charAt(0) != 'i') {
                let state = getComputedStyle(e.target).getPropertyValue('background-color');
                let col = miscFns.getCol(e.target.id);
                let row = miscFns.getRow(e.target.id);
                if (state === offColor) {
                    e.target.style.backgroundColor = onColor;
                    miscFns.addDragElement(e.target, this.type, row, col);
                    this.matrix[row][col] = 1;
                }
                else {
                    e.target.style.backgroundColor = offColor;
                    miscFns.removeDragElement(e.target);
                    this.matrix[row][col] = 0;
                }
            }
        });
        // mouseover and out listeners, needs to use tracking from above, mouseEnteredClicked
        gridElements[i].addEventListener('mouseover', (e) => {
            // need to check is user is dragging, and for inner element
            if (isDragging) { return }
            else if (e.target.id.charAt(0) != 'i') {
                let state = getComputedStyle(e.target).getPropertyValue('background-color');
                let col = miscFns.getCol(e.target.id);
                let row = miscFns.getRow(e.target.id);
                // if mouse enters and is unclicked
                if (e.buttons === 0 && (state === offColor || onColor)) mouseEnteredUnclicked = true;
                // if mouse enters and is clicked and bg is off
                else if (e.buttons === 1 && state === offColor) {
                    e.target.style.backgroundColor = onColor;
                    this.matrix[row][col] = 1;
                    miscFns.addDragElement(e.target, this.type, row, col);
                    mouseEnteredUnclicked = false;
                }
                // if mouse enters and is clicked and bg is on
                else if (e.buttons === 1 && state === onColor) {
                    e.target.style.backgroundColor = offColor;
                    miscFns.removeDragElement(e.target);
                    this.matrix[row][col] = 0;
                    mouseEnteredUnclicked = false;
                }
            }

        });
        gridElements[i].addEventListener('mouseout', (e) => {
            // need to check is user is dragging, and for inner element
            if (isDragging) { return }
            else if (e.target.id.charAt(0) != 'i') {
                let state = getComputedStyle(e.target).getPropertyValue('background-color');
                let col = miscFns.getCol(e.target.id);
                let row = miscFns.getRow(e.target.id);
                // if mouse leaves and is clicked and bg is off
                if (e.buttons === 1 && state === offColor && mouseEnteredUnclicked) {
                    e.target.style.backgroundColor = onColor;
                    miscFns.addDragElement(e.target, this.type, row, col);
                    this.matrix[row][col] = 1;
                    mouseEnteredUnclicked = false;
                }
                // if mouse leaves and is clicked and bg is on
                else if (e.buttons === 1 && state === onColor && mouseEnteredUnclicked) {
                    e.target.style.backgroundColor = offColor;
                    miscFns.removeDragElement(e.target);
                    this.matrix[row][col] = 0;
                    mouseEnteredUnclicked = false;
                }
            }
        });
    }

    // mouse listener on grid containers for expanding and contracting a grid element
    // how it works
    // when user clicks, store X, e.target, original width of e.target, dragging = true
    // then, when user moves mouse, set the new width of the element as the new mouse
    // position - the starting position + original width
    // if the newWidth % ogWidth(see global) === 0, then set the width of the element
    // modulus add a 'snap' effect
    let startingX = 0;
    let newWidth = 0;
    let extendElement = '';
    let originalWidth = '';
    document.addEventListener('mousedown', (e) => {
        startingX = 0;
        if (e.target.id.charAt(0) === 'i') {
            extendElement = e.target.parentElement;
            console.log(extendElement)
            originalWidth =  parseInt(getComputedStyle(extendElement).getPropertyValue('width'), 10);
            isDragging = true;
            startingX = e.clientX;
        }
    });
    document.getElementById(`${this.type}-grid`).addEventListener('mouseup', (e) => {
        if (isDragging) isDragging = false;
    });
    // add to document so that when u move outside of the grid, it still drags
    document.addEventListener('mousemove', (e) => {
        if(isDragging){
            newWidth = (e.clientX - startingX) + originalWidth;
            if (newWidth === 0) extendElement.style.width = ogWidth;
            else if (newWidth % ogWidth === 0){
                console.log(extendElement[0])
                extendElement.style.width = newWidth.toString() + 'px';
            }
        }
    });
    
}

// eventlistener for whole document if when dragging, user leaves the sequencer container
globalMouseup = function(){
    document.addEventListener('mouseup', (e) => {
        isDragging = false;
    })
}*/