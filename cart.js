AFRAME.registerComponent('product', {
  schema: {
    myType: {type: 'string', default: 'correct'}
  },

  init: function () {
   
   let el = this.el;
   let data = this.data;
    let checker = document.getElementById('checker')
   let product;
   el.addEventListener("hitstart", e => 
    {   
      console.log(e.target.id+"collided ",);
    product=document.getElementById(e.target.id)
    product.setAttribute('dynamic-body','enabled:false');
    product.className = "new";

//document.getElementById("trolly").appendChild(product);
product.setAttribute('position',el.getAttirbute('position'));

//el.parentElement.appendChild(document.getElementById(e.target.id))
    if(e.target.id =="correct"){
      checker.emit('correct');
          
    }else{
        
      checker.emit('wrong');
    }
{
          

   
         
      
         }}

 );
    
  }
 
});
