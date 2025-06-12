import * as THREE from 'three';
// textures/rug.jpg' import the images  


function createSofa() {
    const chairGroup = new THREE.Group();
    chairGroup.name = 'High Back Chair';

    // Materials
    // Using standard materials for realistic rendering
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0x8e9aad, roughness: 0.5, metalness: 0.2 });
    const backrestMat = new THREE.MeshStandardMaterial({ color: 0x7a8799, roughness: 0.6, metalness: 0.15 });
    const armrestMat = new THREE.MeshStandardMaterial({ color: 0x6c7684, roughness: 0.7, metalness: 0.1 });
    const legMat = new THREE.MeshStandardMaterial({ color: 0x8b5c2a, roughness: 0.8, metalness: 0.3 }); // Wood

    // Dimensions
    const seatW = 0.7, seatD = 0.7, seatH = 0.18;
    const backrestW = seatW, backrestH = 1.1, backrestT = 0.12;
    const armrestW = 0.12, armrestH = 0.32, armrestL = seatD * 0.92;
    const legR = 0.06, legH = 0.7;

    // Seat
    const seat = new THREE.Mesh(new THREE.BoxGeometry(seatW, seatH, seatD), cushionMat);
    seat.position.set(0, seatH/2 + legH, 0);
    seat.name = 'Seat';
    seat.castShadow = seat.receiveShadow = true;
    chairGroup.add(seat);

    // High Backrest
    const backrest = new THREE.Mesh(new THREE.BoxGeometry(backrestW, backrestH, backrestT), backrestMat);
    backrest.position.set(0, legH + seatH + backrestH/2 - 0.01, -seatD/2 + backrestT/2);
    backrest.name = 'High Backrest';
    backrest.castShadow = backrest.receiveShadow = true;
    chairGroup.add(backrest);

    // Left Armrest
    const armrestLft = new THREE.Mesh(new THREE.BoxGeometry(armrestW, armrestH, armrestL), armrestMat);
    armrestLft.position.set(-seatW/2 + armrestW/2, legH + seatH + armrestH/2 - 0.01, 0);
    armrestLft.name = 'Left Armrest';
    armrestLft.castShadow = armrestLft.receiveShadow = true;
    chairGroup.add(armrestLft);

    // Right Armrest
    const armrestRgt = new THREE.Mesh(new THREE.BoxGeometry(armrestW, armrestH, armrestL), armrestMat);
    armrestRgt.position.set(seatW/2 - armrestW/2, legH + seatH + armrestH/2 - 0.01, 0);
    armrestRgt.name = 'Right Armrest';
    armrestRgt.castShadow = armrestRgt.receiveShadow = true;
    chairGroup.add(armrestRgt);

    // Legs (4 corners)
    const legY = legH/2;
    const legZ = seatD/2 - legR;
    const legX = seatW/2 - legR;
    const legPositions = [
        [-legX, legY, -legZ],
        [ legX, legY, -legZ],
        [-legX, legY,  legZ],
        [ legX, legY,  legZ],
    ];
    for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(legR, legR, legH, 20), legMat);
        leg.position.set(...legPositions[i]);
        leg.name = `Leg ${i+1}`;
        leg.castShadow = leg.receiveShadow = true;
        chairGroup.add(leg);
    }

    // Center the chair at (0,0,0)
    chairGroup.position.set(0, 0, 0);
    return chairGroup;
}

function createTable() {
    const tableGroup = new THREE.Group();
    tableGroup.name = 'Table';

    // Materials
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0x8b5c2a, roughness: 0.6, metalness: 0.2 }); // Wood
    const legMat = new THREE.MeshStandardMaterial({ color: 0x6c7684, roughness: 0.7, metalness: 0.1 }); // Metal

    // Dimensions
    const tableTopW = 1.2, tableTopD = 0.8, tableTopH = 0.05;
    const legR = 0.05, legH = 0.7;

    // Table Top
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(tableTopW, tableTopH, tableTopD), tableTopMat);
    tableTop.position.set(0, legH + tableTopH / 2, 0);
    tableTop.name = 'Table Top';
    tableTop.castShadow = tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Legs (4 corners)
    const legY = legH / 2;
    const legZ = tableTopD / 2 - legR;
    const legX = tableTopW / 2 - legR;
    const legPositions = [
        [-legX, legY, -legZ],
        [legX, legY, -legZ],
        [-legX, legY, legZ],
        [legX, legY, legZ],
    ];
    for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(legR, legR, legH, 20), legMat);
        leg.position.set(...legPositions[i]);
        leg.name = `Table Leg ${i + 1}`;
        leg.castShadow = leg.receiveShadow = true;
        tableGroup.add(leg);
    }

    // Position the table in front of the chair
    tableGroup.position.set(0, 0, 1.2); // Adjust Z-axis to place it in front of the chair
    return tableGroup;
}

function createLamp() {
    const lampGroup = new THREE.Group();
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32), new THREE.MeshStandardMaterial({ color: 0x333333 }));
    lampBase.position.set(0, 0.5, 0);
    lampGroup.add(lampBase);

    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    lampShade.position.set(0, 0.7, 0);
    lampGroup.add(lampShade);

    const lampLight = new THREE.PointLight(0xffe066, 6, 5);
    lampLight.position.set(0, 0.6, 0);
    lampGroup.add(lampLight);

    lampGroup.position.set(0, 0.5, 1.5); // Position near the table
    return lampGroup;
}

function createRug() {
    const rugTexture = new THREE.TextureLoader().load('textures/rug.jpg');
    const rugMaterial = new THREE.MeshStandardMaterial({ map: rugTexture });
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), rugMaterial);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, 1.2); // Position under the table
    return rug;
}



function createPlant() {
    const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 0.77, 32),
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
    );

    const earthTexture = new THREE.TextureLoader().load('textures/jupiter.jpg'); // Load the Earth texture
    earthTexture.wrapS = THREE.RepeatWrapping; // Ensure the texture wraps horizontally
    earthTexture.wrapT = THREE.RepeatWrapping; // Ensure the texture wraps vertically
    earthTexture.repeat.set(1, 1); // Adjust the repeat values if necessary

    const leavesMaterial = new THREE.MeshStandardMaterial({ map: earthTexture }); // Apply the texture to the material
    const leaves = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), leavesMaterial); // Increase segments for smoother mapping
    leaves.position.set(0, 0.7, 0);

    const plantGroup = new THREE.Group();
    plantGroup.add(pot);
    plantGroup.add(leaves);
    plantGroup.position.set(-1.1, 0.4, 0); // Position near the chair
    return plantGroup;
}

function createBooks() {
    const bookTextures = [
        'textures/bookCover.jpg',
        'textures/bookCover1.webp',
        'textures/bookCover2.jpg',
        'textures/bookCover3.jpg',
    ]; // Array of book cover textures

    const booksGroup = new THREE.Group();
    booksGroup.name = 'Books';

    const positionsAndRotations = [
        { position: [-0.4, 0.78, 1.0], rotation: Math.PI / 4 }, // Top-left corner
        { position: [0.5, 0.77, 1.0], rotation: -Math.PI / 6 }, // Top-right corner
        { position: [0.4, 0.78, 1.4], rotation: Math.PI / 8 }, // Bottom-right corner
        { position: [-0.2, 0.76, 1.4], rotation: -Math.PI / 3 }, // Bottom-left corner
    ];

    bookTextures.forEach((texturePath, index) => {
        const bookTexture = new THREE.TextureLoader().load(texturePath); // Load each book cover texture
        const bookMaterial = new THREE.MeshStandardMaterial({ map: bookTexture });
        const book = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.2), bookMaterial);

        // Apply position and rotation based on the predefined array
        const { position, rotation } = positionsAndRotations[index];
        book.position.set(...position);
        book.rotation.y = rotation; // Rotate the book at different angles
        book.name = `Book ${index + 1}`;
        booksGroup.add(book);
    });

    // Add a white paper object
    const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4), paperMaterial);
    paper.rotation.x = -Math.PI / 2; // Lay flat on the table
    paper.position.set(0, 0.76, 1.0); // Position in the center of the table
    paper.name = 'Paper';
    booksGroup.add(paper);

    // Add a pen object
    const penAndHolder = createPenAndHolder();
    booksGroup.add(penAndHolder);

    return booksGroup;
}

function createPenAndHolder() {
    const penGroup = new THREE.Group();
    penGroup.name = 'Pen and Holder';

    // Pen Body
    const penBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black pen body
    const penBody = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.15, 32), penBodyMaterial);
    penBody.position.set(0, 0.075, 0); // Center the pen body
    penGroup.add(penBody);

    // Pen Tip
    const penTipMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Gray pen tip
    const penTip = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.02, 0.03, 32), penTipMaterial);
    penTip.position.set(0, 0.17, 0); // Position at the end of the pen body
    penGroup.add(penTip);

    // Position the pen horizontally on the paper
    penGroup.position.set(0, 0.76, 1.0); // Position on the paper
    penGroup.rotation.x = Math.PI / 2; // Rotate to lay horizontally

    return penGroup;
}
// Export the table creation function
export { createSofa, createTable, createLamp, createRug, createPlant, createBooks };