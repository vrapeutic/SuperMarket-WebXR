AFRAME.registerComponent('blink-teleportation', {
    schema: {
        camera: { type: 'selector', default: '#cam' },
        cameraRig: { type: 'selector', default: '#camRig' },
        deviceButtons: { default: ['click', 'mousedown', 'triggerdown'] },
        cursor: { type: 'string', default: '#my-cursor' },
        raycasterObjects: { type: 'string', default: '.Items,.notItems,.clickable,#trolly' },
        dof: { type: 'number', default: 6 },
        hand: { type: 'string', default: 'right' },
        color: { type: 'string', default: '#000000' },
        pos: { type: 'vec3' },
        dur: { type: 'number', default: 250 },
        hide: { type: 'boolean', default: false }
    },

    init: function() {
        var el = this.el;
        var data = this.data;
        var isMobileVR = AFRAME.utils.device.isMobileVR();
        var isHeadsetConnected = AFRAME.utils.device.checkHeadsetConnected();
        var blinkTeleportationEls = document.querySelectorAll('[blink-teleportation]');
        var cart = document.getElementById('trolly');
        var camRig2 = document.getElementById('camRig');
        document.querySelector('a-scene').addEventListener('enter-vr', function() {
            let cam = document.querySelectorAll('[camera]');
            //  cam[0].parentNode.removeChild(cam[0]);
            let hands = document.querySelectorAll('[hand-controls]');
            hands.forEach(hand => {
                console.log(hand);
                if (hand.parentElement.id != 'camRig') {
                    console.log("hand");

                    hand.parentNode.removeChild(hand);
                }
            })
            cam.forEach(camera => {
                if (camera.parentElement.id != 'camRig') {
                    camera.setAttribute('camera', 'active', false);
                    camera.parentNode.removeChild(camera);

                }
                // DETECTING DEVICE AND SETTING SELECTIVE INTERSECTIONS
                if (!isMobileVR && !isHeadsetConnected) {
                    // Standard Desktop
                    var cursor = document.createElement('a-cursor');
                    // cursor.setAttribute('raycaster', 'objects', data.raycasterObjects);
                    data.camRig.appendChild(cursor);
                } else if (isMobileVR || isHeadsetConnected) {
                    if (data.dof === 3) {
                        // Oculus Go
                        var controller_1 = document.createElement('a-entity');
                        controller_1.setAttribute('laser-controls', 'hand', data.hand);
                        controller_1.setAttribute('raycaster', 'objects', data.raycasterObjects);
                        data.camRig.appendChild(controller_1);
                    } else if (data.dof === 6) {
                        // Oculus Quest || Rift S, Rift, and (not tested but it should work) HTC Vive
                        var controller_RH = document.createElement('a-entity');
                        controller_RH.setAttribute('laser-controls', 'hand', 'right');
                        controller_RH.setAttribute('raycaster', 'objects', data.raycasterObjects);
                        controller_RH.setAttribute('raycaster', 'far', '100');
                        controller_RH.setAttribute('garb', 'enabled', true);
                        var controller_LH = document.createElement('a-entity');
                        controller_LH.setAttribute('laser-controls', 'hand', 'left');
                        controller_LH.setAttribute('raycaster', 'objects', data.raycasterObjecs);
                        controller_LH.setAttribute('garb', 'enabled', true);

                        //camRig2.appendChild(controller_RH);
                        camRig2.appendChild(controller_LH);
                        camRig2.appendChild(document.getElementById("rightHand"));
                    }
                }
                // CREATE A TRANSPARENT BLACK IMAGE
                var blink = document.createElement('a-image');
                blink.setAttribute('material', {
                    color: data.color,
                    opacity: 0
                });
                blink.setAttribute('animation', {
                    dur: data.dur,
                    easing: 'easeInOutQuad'
                });
                // SET THE BLACK IMAGE POSITION AND APPEND IT AS CAMERA'S CHILD ENTITY
                blink.object3D.position.z = -0.1;
                data.camera.appendChild(blink);

                // ON ANY data.deviceButtons, ANIMATE THE BLACK IMAGE (FADE-IN)
                data.deviceButtons.forEach(function(btn) {
                    el.addEventListener(btn, function() {
                        blink.setAttribute('animation', {
                            property: 'material.opacity',
                            from: 0,
                            to: 1
                        });
                        setTimeout(function() {
                            var camRig = document.querySelector('[camera]');
                            //  var newPos = objectToPos(incomingData.position);

                            camRig.removeAttribute('wasd-controls');
                            cart.object3D.position.x = data.pos.x;
                            cart.object3D.position.z = (data.pos.z - 1);

                            camRig.setAttribute('position', data.pos)
                                // cart.setAttribute('position', " " + data.pos.x + "0.10" + data.pos.z);
                                // data.camRig.object3D.position.z = data.pos.z;
                            data.cameraRig.setAttribute('position', data.pos);



                            camRig.setAttribute('wasd-controls');
                            camRig.setAttribute('wasd-controls', true);
                            camRig.setAttribute('wasd-controls', 'true');
                            camRig.setAttribute('wasd-controls-enabled', true);

                            /* camRig.removeAttribute('look-controls');
                             camRig.object3D.rotation.x = incomingData.rotation._x
                             camRig.object3D.rotation.y = incomingData.rotation._y
                             camRig.object3D.rotation.z = incomingData.rotation._z
                             camRig.setAttribute('look-controls');
                             camRig.setAttribute('look-controls', true);
                             camRig.setAttribute('look-controls', 'true');
                             camRig.setAttribute('look-controls-enabled', true);*/

                            // CLASS AND VISIBLE ATTRIBUTES
                            for (var i = 0; i < blinkTeleportationEls.length; i++) {
                                // RESET THE CLICKABLE VALUE FOR ALL THE BLINK-TELEPORTATION ELEMENTS
                                blinkTeleportationEls[i].setAttribute('class', 'clickable');
                                // MAKE ALL THE BLINK-TELEPORTATION ELEMENTS VISIBLE
                                blinkTeleportationEls[i].setAttribute('visible', 'true');
                            }

                            el.setAttribute('class', 'not-clickable');

                            // THEN, IF HIDE PROPERTY IS SET TO TRUE, HIDE THE BLINK-TELEPORTATION ELEMENT
                            if (data.hide === true) {
                                el.setAttribute('visible', 'false');
                            }

                            // EMIT CUSTOM EVENT TO TRIGGER THE FADE-OUT ANIMATION
                            el.emit('position-changed');
                        }, data.dur);
                    });
                });

                // ON CUSTOM EVENT, ANIMATE THE BLACK IMAGE (FADE-OUT)
                el.addEventListener('position-changed', function() {
                    blink.setAttribute('animation', {
                        from: 1,
                        to: 0
                    });
                });
            });
        });
    }
})