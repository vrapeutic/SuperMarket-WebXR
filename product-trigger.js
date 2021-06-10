window.correctProducts = 0;
window.wrongProducts = 0;
const ADD_VALUE = 0.1;

window.x=0.1;
 window.y=0;
window.z=0.1;
AFRAME.registerComponent('product-collector', {
  schema: {
    myType: {type: 'string', default: 'correct'}
  },

  init: function () {
   
   let el = this.el;
   let data = this.data;
   var correctProduct;
   var wrongProduct;
   console.log('corrrect '+el);
  el.addEventListener("correctCollect", function(){
   // hlioynntrgnfl correctProduct=document.querySelectorAll('.newItems');  
     console.log('corrrect product'+el);

   // el.setAttribute('material','color','blue');
el.setAttribute('static-body','enabled:true');
setTimeout(() => {
  var new_element = el.cloneNode(true);
    el.parentNode.replaceChild(new_element,el);
    console.log(window.z+""+el.object3D.position.z);
//new_element.object3D.position.z=0;
//new_element.object3D.position.y=0;
//window.x=(el.object3D.position.x- document.getElementById('trolly').getAttribute("position").x)-1;
//window.z=el.object3D.position.z+ document.getElementById('trolly').getAttribute("position").z;
 //window.y=el.object3D.position.y- document.getElementById('trolly').getAttribute("position").y;
 console.log(window.z+""+el.object3D.position.z);
if(window.x>=0.2)
 window.x=window.x-0.1;
 else if(window.x<0.2&&window.z<=0.7)
 window.z=window.z+0.2;
//else window.z=window.z+0.1;
else if (window.z>=0.7)
window.x=window.x+0.1;

  new_element.setAttribute("position",""+window.x+" 0.6 "+window.z);

 document.getElementById('trolly').appendChild(new_element); 

    }, 2000);
  })

 el.addEventListener("wrongCollect", function(){
   el.setAttribute('static-body','enabled:true');

     console.log('wrong product'+el);
   window.wrongProducts++;
  window.x+=0.1;

   //document.getElementById('trolly').appendChild(wrongProduct[wrongProduct[0]]); 
   setTimeout(() => {
  var new_element =el.cloneNode(true);
 el.parentNode.replaceChild(new_element,el);
       document.getElementById('trolly').firstElementChild.appendChild(new_element); 
  new_element.setAttribute("position",{x:window.x,y:0,z:0.2});

  }, 2000);

  })
    
  }
 
});
