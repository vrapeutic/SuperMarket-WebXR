window.correctProducts = 0;
window.wrongProducts = 0;

AFRAME.registerComponent('product-checker', {
  schema: {
    myType: {type: 'string', default: 'correct'}
  },

  init: function () {
   
   let el = this.el;
   let data = this.data;
   let product;
  el.addEventListener("correct", function(){
    el.setAttribute('material','color','blue');
    console.log('corrrect product');
    window.correctProducts++;
  })

 el.addEventListener("wrong", function(){
     el.setAttribute('material','color','red');
     console.log('wrong product');
   window.wrongProducts++;
  })
    
  }
 
});
