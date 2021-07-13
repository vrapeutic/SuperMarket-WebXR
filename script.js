/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");
AFRAME.registerComponent("dragndrop", {
    init: function() {
        var el = this.el;
        var camera = document.getElementById("cam")
            /* var dist = null
             var dir = new THREE.Vector3()

             var scene = document.querySelector('a-scene');
             var camera = document.querySelector('a-camera');
             this.el.addEventListener("mousedown", e => {
                 console.log(e.detail);
                 // update the base distance between the cursor to the object
                 dist = this.el.object3D.position.clone()
                     .sub(camera.object3D.position).length()

                 dir.copy(scene.getAttribute("raycaster").direction)

                 this.el.addState("being-dragged")
             })

             document.addEventListener("mousemove", () => {
                 // update the direction from raycaster coponent
                 dir.copy(scene.getAttribute("raycaster").direction)
             })

             this.el.addEventListener("click", e => {
                 // complete the drag when click completed
                 this.el.removeState("being-dragged")
             })*/
        el.addEventListener("raycaster-intersection", e => {
            console.log(e.detail.els.map((x) => x.id)[0]);
            var id = e.detail.els.map((x) => x.id)[0];
            var element = document.getElementById(id);
            if (element.className == "Items" || element.className == "notItems") {
                element.addEventListener("click", () => {
                    console.log(el.parentElement);
                    //  document.getElementById("item1").appendChild(element);
                    if (document.getElementById("laser").firstElementChild == null) {
                        element.emit('grab')
                    }
                })
            }
        })
    },
    /*   tick: function() {5793333363/+
           // only move it when certain state is meet
           if (this.el.is('being-dragged')) {
               var target = camera.object3D.position.clone()
                   .add(dir.multiplyScalar(dist))

               this.el.object3D.copy(target)
           }
       }*/
})