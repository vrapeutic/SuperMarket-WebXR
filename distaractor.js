AFRAME.registerComponent("moverandomly", {
  
    init: function()
    {
  
      var target = document.querySelectorAll(".clickable");//Array of targets
      var ds = document.getElementById("butterflymodel");// distractor element
      ds.setAttribute('aabb-collider','enabled',false);
   //   console.log(target + " this " + ds+document.getElementById("level").getAttribute("value"));
  
     // level 2

    
    let startDsMovement= function randommovenmet(index) 
      {
  
        setTimeout(function() 
        {
    
       randomIndexTarget=Math.floor(Math.random() * Math.floor(target.length));  
    
       nextTargetPosition=target[ randomIndexTarget].getAttribute("position");//  next target for distractor
     
      ds.setAttribute("animation","property:position; to:"+(nextTargetPosition.x-1)+" 0 "+nextTargetPosition.z+"delay:5000; dur:8000"); 
    
      
    
      
    
          if (index >= target.length) 
          {
               
               index = 0; // Set it back to `0` when it reaches `3`
            }
  
            randommovenmet(index);
      
        }, 8000);
    }
      
    startDsMovement( target.length);

    }})