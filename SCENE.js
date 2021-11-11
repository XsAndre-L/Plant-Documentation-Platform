//BABYLON.GLTFFileLoader.IncrementalLoading = false;


        var canvas = document.getElementById("renderCanvas");

        var engine = null;
        
        var scene = null;

        var sceneToRender = null;

        
        var createDefaultEngine =  function() { 
            return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); 
            //var EN = new BABYLON.WebGPUEngine(canvas);
            //await EN.initAsync();
            
            //return EN;
        };

        var createDefaultScene = function(scene) {
            // Setup the scene
            var scene = new BABYLON.Scene(engine);
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

        
        let mesh1,mesh2;
        var Meshes = [mesh1];
        let P_meshName = ["Orchid.glb","OrchidPlant.glb"]

        var createScene = function (scene, Canvas) {
            scene.clearColor = new BABYLON.Color3.Black();
            
            for (let index = 0; index < Meshes.length; index++) {
                
                Meshes[index] = BABYLON.SceneLoader.ImportMesh(
                    null, 
                    "Assets/Models/", 
                    P_meshName[index], 
                    scene, 
                    function (
                        meshes,
                        materials
                    ) {
                        scene.createDefaultCameraOrLight(true);
                        scene.activeCamera.attachControl(Canvas, true);
                        //meshes[0].scaling.x = 20;
                        //materials[0].isVisible = false;
                        Meshes[index] = meshes[0];
                    }
                );
            }

            
            return scene;
        };

        engine = createDefaultEngine();
        

        if (!engine) throw 'engine should not be null.';
        scene = createDefaultScene(scene);
        scene = createScene(scene, canvas);
        
        scene.environmentTexture = null;

        
       
        //Meshes[0].isVisible = false;

        sceneToRender = scene;

       
        
        //meshes[0].setEnabled(false);
    
        // Start rendering the scene based on the engine render loop.
        engine.runRenderLoop(function () {
            
            if (sceneToRender) {
                sceneToRender.render();
                //console.log("RUNNING");
            }
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });