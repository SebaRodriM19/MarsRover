const gridContainer = document.getElementById('grid-container');
        const rowsInput = document.getElementById('rows-input');
        const columnsInput = document.getElementById('columns-input');
        const spaceShip = '🚀';
        const gridItems = [];  // Array for movements

        const game = (event) => {
            event.preventDefault();
            marsRoverGame(parseInt(rowsInput.value),parseInt(columnsInput.value));
        }

        const marsRoverGame = (rows, columns) => {
            gridCreation(rows,columns);
            randomPlaceSpaceship(rows,columns);
        }

        const gridCreation = (rows, columns) => {
            //Remove previous grid
            gridContainer.innerHTML = '';
            gridItems.length = 0;

            //Create cells
            for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.className = 'row';

            for (let j = 0; j < columns; j++) {
                const gridItem = document.createElement('div');
                gridItem.textContent = "-";
                gridItem.className = 'grid-item col text-white';
                row.appendChild(gridItem);

                gridItems.push(gridItem);  
            }

            gridContainer.appendChild(row);
            }
        }
        
        const randomPlaceSpaceship = (rows, columns) => {
            const randomRow = Math.floor(Math.random() * rows);
            const randomColumn = Math.floor(Math.random() * columns);

            // Select cell
            const row = gridContainer.children[randomRow];
            const cell = row.children[randomColumn];

            cell.textContent = spaceShip;
        }
        const moveSpaceship = (event) => {
            const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

            if (arrowKeys.includes(event.key)) {
                event.preventDefault();

                movementSpaceShip(event.key);
            }
        }
        const movementSpaceShip = (direction) => {
            const foundSpaceShip = findSpaceShip();
            const row = foundSpaceShip.parentNode; // riga che contiene la spaceship
            const rowIndex = Array.from(row.children).indexOf(foundSpaceShip);
            const columnIndex = Array.from(gridContainer.children).indexOf(row);

            let targetCell;

            switch (direction) {
                case 'ArrowUp':
                    // "?" set null a value out of index without generating errors.
                    targetCell = gridContainer.children[columnIndex - 1]?.children[rowIndex]; 
                    if (!targetCell) {
                        targetCell = gridContainer.lastElementChild.children[rowIndex]; //last element col same row
                    }
                    break;
                case 'ArrowDown':
                    targetCell = gridContainer.children[columnIndex + 1]?.children[rowIndex];
                    if (!targetCell) {
                        targetCell = gridContainer.firstElementChild.children[rowIndex]; //first element col same row
                    }
                    break;
                case 'ArrowLeft':
                    targetCell = row.children[rowIndex - 1];
                    if (!targetCell) {
                        targetCell = row.lastElementChild; //last element row same row
                    }
                    break;
                case 'ArrowRight':
                    targetCell = row.children[rowIndex + 1];
                    if (!targetCell) {
                        targetCell = row.firstElementChild; //first element row same row
                    }
                    break;
            }

            if (targetCell && targetCell.textContent !== spaceShip) {
                targetCell.textContent = spaceShip;
                foundSpaceShip.textContent = '-';
            }
        }


        const findSpaceShip = () => {
            let foundSpaceShip = null; 

            for (const gridItem of gridItems) {
                if (gridItem.textContent === spaceShip) {
                    foundSpaceShip = gridItem;
                    break;
                }
            }
            return foundSpaceShip;    
        }
        document.getElementById('grid-form').addEventListener("submit", game);
        document.addEventListener('keydown', moveSpaceship);