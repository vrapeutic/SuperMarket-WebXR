AFRAME.registerComponent('teleportation', {


    init: function() {

        var el = this.el
        let pos = el.object3D.position
        let camRig = document.querySelector('#camRig');
        let cam = document.querySelector('#cam');
        cam.setAttribute('camera', 'active', true);
        el.addEventListener('click', function() {
            camRig.setAttribute('animation', 'property: position;to:' + pos.x + '' + pos.y + '' + pos.z + ';dur: 1000')
        });
    }
})