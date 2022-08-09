AFRAME.registerComponent('range_test', {

    init: function(){
            const scene = document.querySelector("a-scene");
            let width = 720//window.screen.availWidth;
            let height = 1280//window.screen.availHeight;
            
            scene.setAttribute("arjs", `trackingMethod: best; sourceType: webcam; debugUIEnabled: false; sourceWidth:${width};sourceHeight:${height};displayWidth:${width}; displayHeight:${height} `)
            const marker = document.querySelector("a-marker");
            
            var text = document.querySelector("#top");
            const camera = document.querySelector('[camera]');
            const box = document.querySelector('a-box');
            let markerPosition;
            let markerRotation;
            let update;
            marker.addEventListener("markerFound", function(){
                //let cameraPosition = camera.object3D.position;
                
                //console.log(cameraPosition);
                //console.log(markerRotation._x);
                text.setAttribute("value", "found");

                update = setInterval(() => {
                    //cameraPosition = camera.object3D.position;
                    markerPosition = marker.object3D.position;
                    markerRotation = marker.object3D.rotation;
                    //box.object3D.position.set(markerPosition);
                    box.object3D.setRotationFromEuler(markerRotation);
                    box.setAttribute("position",{x:markerPosition.x, y:markerPosition.y, z:markerPosition.z});
                    //box.setAttribute("rotation",{x:markerRotation._x, y:markerRotation._y, z:markerRotation._z})
                    // do what you want with the distance:
                    //console.log(distance);
                }, 16);

            })
            marker.addEventListener("markerLost", function(){
                text.setAttribute("value", "lost");
                box.setAttribute("position", {x:markerPosition.x, y:markerPosition.y, z:markerPosition.z});
                //console.log(box.object3D.position);
                clearInterval(update);

            })


        // var scene = document.querySelector("a-scene");
        // var rainmodel = document.createElement('a-asset-item')
        // rainmodel.setAttribute('id', 'rain')
        // rainmodel.setAttribute('src', '/model_asset/rain/scene.gltf')
        // scene.appendChild(rainmodel)
        // var long = 51.5247038455639;//, -0.1323487488849717;
        // var lat = -0.132348748884972;
        // var model = document.createElement('a-box');
        // model.setAttribute('color',"yellow");
        // model.setAttribute('scale', {x: 1, y: 1, z: 1});
        // model.setAttribute('gps-entity-place',{longitude: long,latitude: lat});
        // model.setAttribute("position", "0 0.54 -2.722");

        // scene.appendChild(model);
        // for (var i = 0; i < 1; i++) {
        //     var model = document.createElement('a-entity');
        //     model.setAttribute('gltf-model', '#rain')
        //     model.setAttribute( "animation-mixer","clip:Take 001; loop:infinite")
        //     model.setAttribute('gps-entity-place',{longitude: long,latitude: lat})
            
        //     model.setAttribute('scale', {x: 0.3, y: 0.3, z: 0.3});
        //     model.setAttribute("position", {x:0, y:-134.42619, z:-215.4534});
            
        //     scene.appendChild(model);
        // }

        // window.addEventListener('load', function(){
        //     const gps_camera = document.querySelector("#gps");
        //     const marker_camera = document.querySelector("#marker"); 
        //     const marker = document.querySelector("a-marker");
        //     let check; 

        //     marker.addEventListener("markerFound", function(){
        //         let vi
        //     })
        // })

    },

    // tick: function(){
    //     console.log(document.querySelector("a-box").object3D.position);
    // }
})