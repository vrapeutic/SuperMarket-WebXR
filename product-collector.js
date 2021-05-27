window.correctProducts = 0;
window.wrongProducts = 0;

AFRAME.registerComponent('product-checker', {
  schema: {
    myType: {type: 'string', default: 'correct'}
  },

  init: function () {
   
   let el = this.el;
   let data = this.data;
   var correctProduct;
   var wrongProduct;

  el.addEventListener("correct", function(){
    correctProduct=document.querySelectorAll('.newItems');  
      console.log('corrrect product'+correctProduct[correctProduct.length-1]);

    el.setAttribute('material','color','blue');
  correctProduct[correctProduct.length-1].setAttribute('dynamic-body','mass:0');
    window.correctProducts++;
    let body=correctProduct[correctProduct.length-1].body;
    body.velocity.set(0,0,0);
    body.angularVelocity.set(0,0,0);
    body.vlambda.set(0,0,0);
    body.wlambda.set(0,0,0);
    
    setTimeout(() => {
         document.getElementById('trolly').appendChild(correctProduct[correctProduct.length-1]); 

    }, 2000);
  })

 el.addEventListener("wrong", function(){
  wrongProduct=document.querySelectorAll('.notNewItems');
     el.setAttribute('material','color','red');
     wrongProduct[wrongProduct.length-1].setAttribute('static-body','enabled:true');

     console.log('wrong product'+wrongProduct[wrongProduct.length-1]);
   window.wrongProducts++;
   wrongProduct[wrongProduct.length-1].setAttribute("scale","1 1 1");

   document.getElementById('trolly').appendChild(wrongProduct[wrongProduct.length-1]); 
   wrongProduct[wrongProduct.length-1].setAttribute("position","0.02805 -0.025 0.25914");

  })
    
  }
 
});
