var Px = 0;
var sum = 0; 
var running = false; 
var pervious_velocity = 0; //can be calibrated
var pervious_acc = 0;
var current_velocity = 0;
//var Py = 0;

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
   
    console.log(Px);
    document.querySelector("#snap").addEventListener("click", ()=>{
      test();
    })
    
   
    },

    tick: function() {
        //console.log(watchAcc());
    }
  });

  function test(){
    window.addEventListener("devicemotion", handleMotion);
    Px = document.querySelector('a-camera').object3D.position.x; 

  }
  function handleMotion(event){
    //document.querySelector("a-text").setAttribute("value", event.accelerationIncludingGravity.x);//console.log(event.accelerationIncludingGravity.x);
    var Accx = event.acceleration.x;
    //if(running){
      current_velocity += (pervious_acc + (Accx-pervious_acc)/2)*event.interval;
      Px += (pervious_velocity + (current_velocity-pervious_velocity)/2)*event.interval;
      pervious_velocity = current_velocity; 
      pervious_acc = Accx;
      document.querySelector("a-text").setAttribute("value", Px);
      //running = false; 
    //}else{
      //Px = 
    //}

  }
  
  function getRandomArbitrary(min, max, decimals) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
  }

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

