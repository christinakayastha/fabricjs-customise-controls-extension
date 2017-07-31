'use strict';
(function() {
    var image1 = document.createElement('img'),
        image2 = document.createElement('img'),
        image3 = document.createElement('img'),
        canvas,
        width = 1000,
        height = 500,
        randomColor = function randomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

    //fabric.Object.prototype.setControlsVisibility( {
    //    ml: false,
    //    mr: false
    //} );

    fabric.Canvas.prototype.customiseControls({
        mtr: {
            action: 'rotate',
            cursor: 'icons/rotate.svg',
        }
    });

    // basic settings
    fabric.Object.prototype.customiseCornerIcons({
        settings: {
            borderColor: '#0094dd',
            cornerSize: 25,
            cornerShape: 'rect',
            cornerBackgroundColor: 'black',
        }
    }, function() {
        canvas.renderAll();
    });

    canvas = new fabric.Canvas('example', {
        width: width,
        height: height,
    });

    image1.src = 'cat.jpg';
    fabric.Image.fromURL(image1.src, function(img) {
        img.set({
            id: 'cat',
            left: 500,
            top: 100,
            scaleX: 0.2,
            scaleY: 0.2,
            originX: 'center',
            originY: 'center',
            cornerStrokeColor: '#4eb6e5',
            transparentCorners: false,
			borderColor: '#4eb6e5',
			rotatingPointOffset: 20
        });

        // overwrite the prototype object based
        img.customiseCornerIcons({
            settings: {
                borderColor: '#4eb6e5',
                cornerBackgroundColor: '#fafafa',
                cornerSize: 8,
                cornerShape: 'rect',
                cornerPadding: 5,
            },
            mtr: {
                icon: 'icons/rotate.svg',
                cursor: 'cow.png',
                settings: {
                    cornerSize: 20,
                    cornerShape: 'circle'
                }
            }
        }, function() {
            canvas.renderAll();
        });

        canvas.add(img);
    });

    canvas.on({
        'after:render': function() {
            canvas.forEachObject(function(obj) {
                document.querySelector('.' + obj.id)
                    .innerText = obj.id + ' z-index: ' + canvas.getObjects().indexOf(obj);
            });

        },
    });
})();
