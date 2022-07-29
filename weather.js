AFRAME.registerComponent('playground', {
    /**
     * Code within this function will be called when everything in <a-scene> is ready and loaded.
     */
    init: function () {
      // Add code here!
    var sceneE1 = document.querySelector('a-scene')
    console.log(sceneE1);
    var rainmodel = document.createElement('a-asset-item')
    rainmodel.setAttribute('id', 'rain')
    rainmodel.setAttribute('src', '/model_asset/rain/scene.gltf')

  
    sceneE1.appendChild(rainmodel)

    window.addEventListener("devicemotion", handleMotion);
    
    // var model = document.createElement('a-entity');
    // model.setAttribute('gltf-model', '#rain')
    //model.setAttribute('gps-entity-place',{longitude: 51.524, 
    //                   
    // model.setAttribute('position', 
    //     {x: 110, 
    //         y: 10,//getRandomArbitrary(-1500,1500), 
    //         z: 0});                 //latitude: -0.132})
    // sceneE1.appendChild(model);

    //   <a-entity gltf-model="model_asset/rain/scene.gltf" position="-0.252 0.137 -0.049" scale="0.001 0.001 0.001" 
    //               animation-mixer="clip:Take 001; loop:infinite"></a-entity>
    var l = 51.52470384556393;//, -0.1323487488849717;
    var lat = -0.1323487488849717;
    for (var i = 0; i < 1; i++) {
        var model = document.createElement('a-entity');
        model.setAttribute('gltf-model', '#rain')
        model.setAttribute( "animation-mixer","clip:Take 001; loop:infinite")
        /model.setAttribute('gps-entity-place',{longitude: l,//getRandomArbitrary(51.520,51.524, 6 ),
                                                 latitude: lat})//getRandomArbitrary(-0.129, -0.132, 6) })
        // model.setAttribute('position', 
        // {x: 1, 
        //     y: 1,//getRandomArbitrary(-1500,1500), 
        //     z: 1});
        model.setAttribute('scale', {x: 0.3, y: 0.3, z: 0.3});
        //model.setAttribute('animation', 'dur:5000; from: 0 0 0; to 30000 30000 30000; loop:-1; property:position')
        const weather_animation_attributes = {
          property : 'position',
          to : '100 100 100',
          loop: true,
          dur: '15000'
        }
        //model.setAttribute('animation', weather_animation_attributes)
        sceneE1.appendChild(model);
    }

    
   
    },

    tick: function() {
        //console.log(watchAcc());
    }
  });
  function handleMotion(event){
    document.querySelector("a-text").setAttribute("value", event.accelerationIncludingGravity.x);//console.log(event.accelerationIncludingGravity.x);
  }
  
  function getRandomArbitrary(min, max, decimals) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
  }

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

