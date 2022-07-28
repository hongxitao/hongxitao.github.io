AFRAME.registerComponent('play-test', {
    /**
     * Code within this function will be called when everything in <a-scene> is ready and loaded.
     */
    init: function () {
      // Add code here!
    var sceneE1 = document.querySelector('a-scene')
    var rainmodel = document.createElement('a-asset-item')
    rainmodel.setAttribute('id', 'rain')
    rainmodel.setAttribute('src', '/model_asset/rain/scene.gltf')

  
    sceneE1.appendChild(rainmodel)
    
    
    //   <a-entity gltf-model="model_asset/rain/scene.gltf" position="-0.252 0.137 -0.049" scale="0.001 0.001 0.001" 
    //               animation-mixer="clip:Take 001; loop:infinite"></a-entity>
    for (var i = 0; i < 8; i++) {
        var model = document.createElement('a-entity');
        model.setAttribute('gltf-model', '#rain')
        model.setAttribute( "animation-mixer","clip:Take 001; loop:infinite")
        model.setAttribute('gps-entity-place',{longitude: getRandomArbitrary(51.524600,51.524800 ),
                                                altitude: getRandomArbitrary(-0.132617, -0.132817) })
        // model.setAttribute('position', 
        // {x: getRandomArbitrary(-200,200), 
        //     y: -100,//getRandomArbitrary(-1500,1500), 
        //     z: getRandomArbitrary(-200,200)});
        model.setAttribute('scale', {x: 0.3, y: 0.3, z: 0.3});
        //model.setAttribute('animation', 'dur:5000; from: 0 0 0; to 30000 30000 30000; loop:-1; property:position')
        const weather_animation_attributes = {
          property : 'position',
          to : '0 0 0',
          loop: true,
          dur: '15000'
        }
        model.setAttribute('animation', weather_animation_attributes)
        sceneE1.appendChild(model);
    }

  
    },

    // tick: function() {
    //     console.log("hello")
    // }
  });

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

