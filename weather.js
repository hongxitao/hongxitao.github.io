

var Px = 0;
var sum = 0; 
var running = true; 
var pervious_velocity = []; //can be calibrated
const pervious_acc = [];
var current_velocity = [];
var cd = 3000;
var alpha=0;
var beta=0;
var gamma=0;
var Acc_count = 0; 
var Vec_count = 0;
var acc = [];
var avgcount = 0; 
var interval_time = 0; 
//var Py = 0;
var date = Date.now();

AFRAME.registerComponent('playground', {
  
    /**
     * Code within this function will be called when everything in <a-scene> is ready and loaded.
     */
    init: function () {
      // Add code here!
    pervious_acc[0] = 0;
    pervious_acc[1] = 0;
    pervious_acc[2] = 0; 
    pervious_velocity[0] = 0;
    pervious_velocity[1] = 0;
    pervious_velocity[2] = 0;
    current_velocity[0] = 0;
    current_velocity[1] = 0;
    current_velocity[2] = 0;
    acc[0] = 0;
    var scene = document.querySelector('a-scene')
    //console.log(sceneE1);
    var rainmodel = document.createElement('a-asset-item')
    rainmodel.setAttribute('id', 'rain')
    rainmodel.setAttribute('src', '/model_asset/rain/scene.gltf')

  
    scene.appendChild(rainmodel)
      // sceneE1.addEventListener("markerFound", function(){
      //   position = document.querySelector("#m1").getAttribute('position');
      //       //alert(position);
      //       console.log(position)
      // })

    var l = 51.5247038455639;//, -0.1323487488849717;
    var lat = -0.132348748884972;
    for (var i = 0; i < 1; i++) {
        var model = document.createElement('a-entity');
        model.setAttribute('gltf-model', '#rain')
        model.setAttribute( "animation-mixer","clip:Take 001; loop:infinite")
        model.setAttribute('gps-entity-place',{longitude: l,//getRandomArbitrary(51.520,51.524, 6 ),
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
        scene.appendChild(model);
    }
   
    console.log(Px);

    distance();


   
    },
    tick: function(){
      // var scene = document.querySelector("a-scene");
      // var mark1 = document.querySelector("#m1");
      // var mark2 = document.querySelector("#m2");
      // // if(mark1.visible){
      // //      console.log("mark1")
      // //     console.log(mark1.getAttribute("position"))
      // // }

      // if(mark1.object3D.visible){
      //   console.log("mark1")
      //   console.log(mark1.getAttribute("position"))
      // }
      // if(mark1.visible && mark2.visible){
      //   console.log("mark1")
      //   console.log(mark1.getAttribute("position"))
      //   console.log("mark2")
      //   console.log(mark2.getAttribute("position"))
      // }
    }

  });
  function distance(){
    // import this on your HTML
  window.addEventListener('load', () => {
  const camera = document.querySelector('[camera]');
  const marker = document.querySelector('a-marker');
  let check;

  marker.addEventListener('markerFound', () => {
    document.querySelector("#top").setAttribute("value","found it");
      // let cameraPosition = camera.object3D.position;
      // let markerPosition = marker.object3D.position;
      // let distance = cameraPosition.distanceTo(markerPosition)

      // check = setInterval(() => {
      //     cameraPosition = camera.object3D.position;
      //     markerPosition = marker.object3D.position;
      //     distance = cameraPosition.distanceTo(markerPosition)

      //     // do what you want with the distance:
      //     console.log(distance);
      // }, 100);
  });

  marker.addEventListener('markerLost', () => {
    //clearInterval(check);
    document.querySelector("#top").setAttribute("value","lose it");
  })
})
  }


  function test(){
    window.location.href = '/Marker_range_test.html';
    // window.addEventListener("devicemotion", handleMotion);
    //Px = document.querySelector('a-camera').object3D.position.x; 
    //window.addEventListener("deviceorientation", handleOrientation);

  }
  function handleMotion(event){
    //document.querySelector("a-text").setAttribute("value", event.accelerationIncludingGravity.x);//console.log(event.accelerationIncludingGravity.x);
    //console.log("in motion")
    var temp = Date.now();
    var time = temp- date;
    //console.log(time); 
    interval_time +=time; 
    avgcount++; 
    //time = interval_time/avgcount;
    date = temp;

    var Accx = event.acceleration.x;
    var interval = time / 1000;
    //acc[0] = Accx;
    if(Math.abs(Accx)>0.3){
      acc[0] = Accx;
      //document.querySelector("a-text").setAttribute("value", Accx);
    }
    else{
      //Accx = pervious_acc[0];
      Acc_count++;
      if(Acc_count>20){
        acc[0]=0;
        //document.querySelector("a-text").setAttribute("value", Accx);
        Acc_count = 0;
      }
    }
    
    if(current_velocity[0] === pervious_velocity[0]){
        Vec_count++;
        if(Vec_count>20) //&& Math.abs(0.1)>current_velocity[0])
        {
          current_velocity[0] = 0;
          pervious_velocity[0] = 0; 
          Vec_count =0;
        }
    }

    

        //0 x/ 1 y/ 2 z
      current_velocity[0] += (pervious_acc[0] + (acc[0]-pervious_acc[0])/2)*interval;
      
      Px += (pervious_velocity[0] + (current_velocity[0]-pervious_velocity[0])/2)*interval;
      pervious_velocity[0] = current_velocity[0]; 
      pervious_acc[0] = acc[0];
      document.querySelector("a-text").setAttribute("value", Px);
      document.querySelector("#inter").setAttribute("value", time);

  }
  function handleOrientation(event){
    alpha = event.alpha;
    beta = event.beta;
    gamma= event.gamma;
  }
  
  function getRandomArbitrary(min, max, decimals) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
  }

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

