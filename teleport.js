AFRAME.registerComponent('teleportation', {


    init: function() {

        var el = this.el
        let pos = el.object3D.position
        let camRig = document.querySelector('#camRig');


        /**/
        document.querySelector('a-scene').addEventListener('enter-vr', function() {
            let cam = document.querySelectorAll('[camera]');
            //  cam[0].parentNode.removeChild(cam[0]);
            cam.forEach(camera => {
                if (camera.parentElement.id != 'camRig') {
                    camera.setAttribute('camera', 'active', false);
                    camera.parentNode.removeChild(camera);
                    el.addEventListener('click', function() {
                        camRig.firstElementChild.setAttribute('animation', 'property: position;to:' + pos.x + '' + pos.y + '' + pos.z + ';dur: 1000')
                    });
                }
                console.log(camera);

            });

        });

    }
})