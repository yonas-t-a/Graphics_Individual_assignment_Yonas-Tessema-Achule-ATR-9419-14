import * as THREE from 'three';

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

// Export the table creation function
export { createSofa, createTable };