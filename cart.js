AFRAME.registerComponent('product', {
  schema: {
    myType: {type: 'string', default: 'correct'}
  },

  init: function () {
   
   let el = this.el;
   let data = this.data;
    let checker = document.getElementById('checker')
   let product;
   document.getElementById("trolly").addEventListener("mousedown",()=>{
var cartPos=el.object3D.position;  
var cartRot=document.querySelector('a-camera').object3D.position
   console.log("pressed"+cartPos.z); 
   cartPos.z--;
   //el.setAttribute('rotation',"0 0 0");
   //el.setAttribute('rotation',cartRot);
 //

el.setAttribute('animation',"property:position; to:"+cartPos.x+""+cartPos.y+""+cartPos.z+"duration:200");
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
    product.removeAttribute('dynamic-body');

      }, 10);
    if(product.className=="Items")
    product.className = "newItems";
    else
    product.className = "notNewItems";


//product.setAttribute('position',document.getElementById("trolly").getAttirbute('position'));

//el.parentElement.appendChild(document.getElementById(e.target.id))
    if(product.className !="newItems"){
             checker.emit('wrong');
   
    }else{
            checker.emit('correct');
  
    }
}

 );
    
  }
 
});
