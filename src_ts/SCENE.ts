//import * as BABYLON from 'babylonjs';
//import { Engine } from "babylonjs";
//import { Scene } from 'babylonjs';
import Engien from 'babylonjs';

const canvas: HTMLCanvasElement =  document.getElementById("renderCanvas") as HTMLCanvasElement;

const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
let scene: BABYLON.Scene = new BABYLON.Scene(engine);
let sceneToRender: any = null;


var createDefaultEngine = function () {
    return new BABYLON.Engine(canvas);
    //var EN = new BABYLON.WebGPUEngine(canvas);
    //await EN.initAsync();
    //return EN;
};

var createDefaultScene = function (scene: BABYLON.Scene) {
    // Setup the scene
    //scene = new BABYLON.Scene(engine);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var camera = new BABYLON.ArcRotateCamera(
        "camera1",
        // -(Math.PI / 2), 
        // Math.PI / 2, 
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(45),
        30,
        new BABYLON.Vector3(0, 5, 0),
        scene
    );
    return scene;
};


var mesh1, mesh2, mesh3;
var Meshes = [mesh1, mesh2, mesh3];
let P_meshName = ["Orchid.glb", "OrchidPlant.glb", "SlipperOrchid.glb"]

var createScene = function (scene: BABYLON.Scene, Canvas:any) {
    //scene.clearColor = new BABYLON.Color3.Black();
    scene.clearColor = new BABYLON.Color4(0,0,0,1);

    for (let index = 0; index < Meshes.length; index++) {
        
            BABYLON.SceneLoader.ImportMesh(
                null,
                //"https://xsandre-l.github.io/Test/Assets/Models/",//Local
                "https://xsandre-l.github.io/Assets/Models/",//non-Local
                P_meshName[index],
                scene,
                function (
                    meshes:any,
                    materials:any
                ) {
                    scene.createDefaultCameraOrLight(true);
                    //scene.activeCamera.attachControl(Canvas, true);
                    scene._activeCamera?.attachControl(Canvas,true);
                }
            );
        
    }

    var buttonbox = document.createElement('div');
    buttonbox.id = "buttonbox";
    buttonbox.style.position = "absolute";
    buttonbox.style.width = "100%";
    buttonbox.style.height = "5%";
    buttonbox.style.bottom = "3%";
    buttonbox.style.columnCount = "2";
    buttonbox.style.textAlign = "center";
    document.body.appendChild(buttonbox);


    var b8 = document.createElement('button');
    buttonbox.appendChild(b8);
    b8.id = "setLateralLeft";
    b8.style.borderRadius = "10px";
    b8.textContent = "<<";
    b8.style.display = "block";
    b8.style.width = "100%";
    b8.style.height = "100%";
    b8.style.fontSize = "2.1em";
    b8.style.backgroundColor = "#3C4043";
    b8.style.color = "#DCDCDC";
    b8.onclick = function () {
        if(CurrMesh - 2 >= 1)
        {
            CurrMesh -= 2;
        }
        
    };

    var b2 = document.createElement('button');
    buttonbox.appendChild(b2);
    b2.id = "setLateralRight";
    b2.style.borderRadius = "10px";
    b2.textContent = ">>";
    b2.style.display = "block";
    b2.style.width = "100%";
    b2.style.height = "100%";
    b2.style.fontSize = "2.1em";
    b2.style.backgroundColor = "#3C4043";
    b2.style.color = "#DCDCDC";
    b2.onclick = function () {
        if(CurrMesh + 2 <= 5)
        {
            //Test
            CurrMesh += 2;
        }
    };

    return scene;
};


createDefaultEngine();
if (!engine) throw 'engine should not be null.';

scene = createDefaultScene(scene);
scene = createScene(scene, canvas);
scene.environmentTexture = null;
sceneToRender = scene;

//Check if Visible mesh is up to date
var CurrMesh = 1;
scene.registerBeforeRender(function () {

    for (let i = 0; i < scene.meshes.length; i++) {
        const mesh = scene.meshes[i];

        if (i == CurrMesh) {
            mesh.isVisible = true;
        } else {
            mesh.isVisible = false;
        }
    }
});


// scene.onReadyObservable.add( function(){

// Start rendering the scene based on the engine render loop.
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
