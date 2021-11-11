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

        
        var mesh1,mesh2;
        var Meshes = [mesh1, mesh2];
        let P_meshName = ["Orchid.glb","OrchidPlant.glb"]

        var createScene = function (scene, Canvas) {
            scene.clearColor = new BABYLON.Color3.Black();
            
            for (let index = 0; index < Meshes.length; index++) {
                
                BABYLON.SceneLoader.ImportMesh(
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
                        //Meshes[index] = meshes[0];
                        //meshes[0].visibility = 0.2;
                    }
                );
            }

            var buttonbox = document.createElement('div');
            buttonbox.id = "buttonbox";
            buttonbox.style.position = "absolute";
            buttonbox.style.justifyContent = "center";
            //buttonbox.style. = "center";
            buttonbox.style.bottom = "60px";
            buttonbox.style.left = "40%";
            //buttonbox.style.right = "30%";
            //buttonbox.style.border = "5pt inset white";
            //buttonbox.style.padding = "2pt";
            //buttonbox.style.paddingRight = "2pt";
            buttonbox.style.width = "500px";
            buttonbox.style.height = "50px";
            //buttonbox.style.display = "block";
            buttonbox.style.columnCount = "2";
            //buttonbox.style.textAlign = "center";
            
            document.body.appendChild(buttonbox);


            var b8 = document.createElement('button');
            buttonbox.appendChild(b8);
            b8.id = "setLateralLeft";
            b8.style.borderRadius = "10px";
            b8.textContent = "<";
            b8.style.display = "block";
            b8.style.width = "100%";
            b8.style.height = "100%";
            b8.style.fontSize = "1.1em";
            b8.onclick = function() {
                CurrMesh = 1;
            };

            var b2 = document.createElement('button');
            buttonbox.appendChild(b2);
            b2.id = "setLateralRight";
            b2.style.borderRadius = "10px";
            b2.textContent = ">";
            b2.style.display = "block";
            b2.style.width = "100%";
            b2.style.height = "100%";
            b2.style.fontSize = "1.1em";
            b2.onclick = function() {
                CurrMesh = 3;
            };

            return scene;
        };

        engine = createDefaultEngine();
        

        if (!engine) throw 'engine should not be null.';
        scene = createDefaultScene(scene);
        scene = createScene(scene, canvas);
        
        scene.environmentTexture = null;

        
        //console.log(Meshes[0].isVisible);
        //Meshes[0].isVisible = false;

        sceneToRender = scene;

    
        var CurrMesh = 1;
        scene.registerBeforeRender(function() { 
            //var CurMehs = Meshes[0];
            //mesh1.setEnabled(false);
           for (let i = 0; i < scene.meshes.length; i++) {
               const mesh = scene.meshes[i];

               if(i == CurrMesh){
                   mesh.isVisible = true;
               }else{
                   mesh.isVisible = false;
               }
           }
        });


        // scene.onReadyObservable.add( function(){



        

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