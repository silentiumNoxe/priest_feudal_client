window.addEventListener("DOMContentLoaded", loadFirebase);
window.addEventListener("DOMContentLoaded", initScene);
window.addEventListener("konva/ready", renderLand);

function initScene() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const stage = new Konva.Stage({container: "map", width, height, draggable: true, antialias: true});

    stage.on("dragmove", () => {
        document.body.style.cursor = "grab";
    })

    stage.on("dragend", () => {
        document.body.style.cursor = "auto";
    })

    const landLayer = window.LandLayer = new Konva.Layer({id: "land"})
    stage.add(landLayer);

    stage.dragBoundFunc(pos => {
        let {x, y} = pos;
        if (-x > landLayer.width() / 3) {
            x = -landLayer.width() / 3;
        }
        if (-y > landLayer.height() / 3) {
            y = -landLayer.height() / 3;
        }
        if (x > 0) {
            x = 0;
        }
        if (y > 0) {
            y = 0;
        }

        return {x, y};
    })

    window.dispatchEvent(new CustomEvent("konva/ready"))
}

async function renderLand() {
    const width = 60;
    const height = 30;

    const client = await import("../client/map_client.js");
    const map = await client.getLand();
    if (map == null || map.length === 0) {
        throw new Error("no map data");
    }

    /** @param data {PosData} */
    function drawTile(data) {
        const width = 50;
        const height = 50;
        const color = {
            grass: "#7b915d",
            water: "#457488"
        }

        const tile = new Konva.Rect({
            x: data.x * width,
            y: data.y * height,
            width,
            height,
            fill: color[data.type],
            strokeWidth: 1,
            stroke: color[data.type]
        });

        window.LandLayer.add(tile);
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let type = "water";
            for (const k of map) {
                if (k.y === y && k.x === x) {
                    type = k.type;
                }
            }
            drawTile({x, y, type})
        }
    }

    console.debug(window.LandLayer.width(), window.LandLayer.height());
}

async function loadFirebase() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.firestore().doc('/foo/bar').get().then(() => { });
    // firebase.functions().httpsCallable('yourFunction')().then(() => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
        let app = firebase.app();
        let features = [
            'auth',
            'database',
            'firestore',
            'functions',
            'messaging',
            'storage',
            'analytics',
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');
        console.info(`Firebase SDK loaded with ${features.join(', ')}`);
    } catch (e) {
        console.error('Error loading the Firebase SDK, check the console.', e);
    }
}