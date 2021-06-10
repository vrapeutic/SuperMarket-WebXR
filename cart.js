AFRAME.registerComponent('product', {
  schema: {
    myType: {type: 'string', default: 'correct'}
  },

  init: function () {
   

   let el = this.el;
   let product;
   el.firstElementChild.addEventListener('correct',()=>{
    var correctLight = document.createElement('a-entity');
    correctLight.setAttribute("area-light", "intensity:1; width:1; height:1; color:green;showHelper:false");
    correctLight.setAttribute("id","greenLight");
   // correctLight.setAttribute("position",el.firstElementChild.object3D.position);
   // el.setAttribute("color", "#1dd4ed")
    this.el.firstElementChild.appendChild(correctLight);
    setTimeout(() => {
      correctLight.parentElement.removeChild(correctLight);
    }, 2000);
   })
   el.firstElementChild.addEventListener('wrong',()=>{
    var wrongLight = document.createElement('a-entity');
    wrongLight.setAttribute("area-light", "intensity:1; width:1; height:1; color: red;showHelper:false");
    wrongLight.setAttribute("id","redLight");
   // el.setAttribute("color", "#1dd4ed")
   // el.setAttribute("color", "#1dd4ed")
   this.el.firstElementChild.appendChild(wrongLight);
   setTimeout(() => {
     wrongLight.parentElement.removeChild(wrongLight);
   }, 2000);   })
   document.getElementById("trolly").addEventListener("click",()=>{
//var cartPos=el.object3D.position;  
var cartRot=document.querySelector('a-camera').object3D.rotation
   console.log("pressed"+cartRot.x); 
   //el.setAttribute('rotation',"0 0 0");
   //el.setAttribute('rotation',cartRot);
      // create a direction vector
      var direction = new THREE.Vector3();
          // get the cameras world direction
          this.el.sceneEl.camera.getWorldDirection(direction);
          // multiply the direction by a "speed" factor
       //  direction.multiplyScalar(0.1)
          // get the current position
          var pos = el.getAttribute("position");
          // add the direction vector0
         // pos.add(direction)
          // set the new position
         // player.setAttribute("position", pos); 
           pos.z--;
el.setAttribute('animation',"property:position; to:"+pos.x+""+pos.y+""+pos.z+"delay:5000 ;dur:8000");
//el.firstElementChild.setAttribute('animation',"property:position; to:"+0+""+.8+""+0+"delay:5000 ;dur:8000"); 
el.setAttribute('animation-mixer',"clampWhenFinished:  true;  loop:  false;  repetitions:  0");
  //el.firstElementChild.object3D.posittion.z--;
 setTimeout(() => {
      el.removeAttribute('animation-mixer');

  }, 1000);
  })
   el.firstElementChild.addEventListener("hitstart", e => 
    {   
      console.log(e.target.id,
        "collided ",
     e.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)[0]
      );
    product=document.getElementById(e.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)[0]
    )
    if(product.className=="Items"||product.className=="notItems")
    setTimeout(() => {
      product.setAttribute("position",document.getElementById("cam").getAttribute('position'));

   product.removeAttribute('dynamic-body');

      }, 10);
    if(product.className=="Items")
    product.className = "newItems";
    else
    product.className = "notNewItems";


//product.setAttribute('position',document.getElementById("trolly").getAttirbute('position'));

//el.parentElement.appendChild(document.getElementById(e.target.id))
    if(product.className !="newItems"){
      console.log(product);
              product.emit('wrongCollect');
  el.firstElementChild.emit('wrong');
    }else{         
      console.log(product);

         product.emit('correctCollect');

            el.firstElementChild.emit('correct');

    }
}

 );
    
  }
 
});
