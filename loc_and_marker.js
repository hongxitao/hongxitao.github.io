AFRAME.registerComponent('range_test', {

    init: function(){
            const marker = document.querySelector("a-marker");
            
            var text = document.querySelector("#top");
            marker.addEventListener("markerFound", function(){
                
                text.setAttribute("value", "found");

            })
            marker.addEventListener("markerLost", function(){
                text.setAttribute("value", "lost");

            })


        var scene = document.querySelector("a-scene");
        var rainmodel = document.createElement('a-asset-item')
        rainmodel.setAttribute('id', 'rain')
        rainmodel.setAttribute('src', '/model_asset/rain/scene.gltf')
        scene.appendChild(rainmodel)
        var long = 51.5247038455639;//, -0.1323487488849717;
        var lat = -0.132348748884972;
        for (var i = 0; i < 1; i++) {
            var model = document.createElement('a-entity');
            model.setAttribute('gltf-model', '#rain')
            model.setAttribute( "animation-mixer","clip:Take 001; loop:infinite")
            model.setAttribute('gps-entity-place',{longitude: long,latitude: lat})
            
            model.setAttribute('scale', {x: 0.3, y: 0.3, z: 0.3});
            model.setAttribute("position", {x:0, y:-134.42619, z:-215.4534});
            
            scene.appendChild(model);
        }

        // window.addEventListener('load', function(){
        //     const gps_camera = document.querySelector("#gps");
        //     const marker_camera = document.querySelector("#marker"); 
        //     const marker = document.querySelector("a-marker");
        //     let check; 

        //     marker.addEventListener("markerFound", function(){
        //         let vi
        //     })
        // })

    }
})