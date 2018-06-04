/* ************************************************************ */
/* ************************* ABSTRACT ************************* */
/* ********* draw an abstract with a random painter *********** */
/* *********************** by Ivo Vacca *********************** */
/* ************************************************************ */



var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

//************************************************************************************************************
//**************************************     paintController     *********************************************
//************************************************************************************************************

var paintController = (function (canvas, ctx) {
    var x, y;
    x = canvas.width / 2;
    y = canvas.height / 2;

    // Logic
    function logic() {
        x += ((Math.random() < 0.5 ? -1 : 1) / 4) - ((Math.random() < 0.5 ? -1 : 1) * 2);
        y += ((Math.random() < 0.5 ? -1 : 1) / 4) - ((Math.random() < 0.5 ? -1 : 1) * 2);

        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            x = canvas.width / 2 + (Math.random() < 0.5 ? -1 : 1) / 2;
            y = canvas.height / 2 + (Math.random() < 0.5 ? -1 : 1) / 2;
        }
        return {
            pointX: x,
            pointY: y
        }
    }

    // Random -40 or 40
    function rRGB(random) {
        return Math.round(random * (Math.random() < 0.5 ? -1 : 1) * 2);
    }

    //Fibonacci
    function fibonacci(num, memo) {
        memo = memo || {};

        if (memo[num]) return memo[num];
        if (num <= 1) return 1;

        return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
    }
    
    //Download schetch
    function dlCanvas() {
        var img = document.querySelector('.logo');
        ctx.drawImage(img, 600, 400, 200, 100);
        var dt = canvas.toDataURL('image/png');
        this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
    document.getElementById('dl').addEventListener('click', dlCanvas, false);

    return {
        paintLogic: function () {
            return logic(x, y);
        },

        getrRGb: function (rnd) {
            return rRGB(rnd);
        },

        getRGBA: function (input, r, g, b, a) {
            var red, green, blue, alpha, radius, color;
            red = input.red + r;
            green = input.green + g;
            blue = input.blue + b;
            alpha = input.alpha + a;
            radius = input.radius;

            var fib = radius;

            color = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / fibonacci(fib)) + ')';
            return {
                fibonacciBlur: fib,
                colors: color
            }
        },

        // Radius is the luminace difference between a pixel and the next one.
        getRGBAPhoto: function (r, g, b, a) {
            var red, green, blue, alpha, colorPhoto;
            red = r;
            green = g;
            blue = b;
            alpha = a;

            //console.log(fibRadius);

            colorPhoto = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';

            return {
                colorsPhoto: colorPhoto
            }
        }
    }

})(canvas, ctx);

//************************************************************************************************************
//**************************************          UI          ************************************************
//************************************************************************************************************

var UIController = (function (canvas, ctx) {
    var DOMStrings, isDrawing;
    DOMStrings = {
        r: 'red',
        g: 'green',
        b: 'blue',
        a: 'alpha',
        radius: 'radius',
        canvas: 'gameCanvas',
        rdn: 'random',
        rdnAlpha: 'randomAlpha',
        startP: 'startPaint',
        stopP: 'stopPaint',
        brush: 'brush',
        pencil: 'pencil',
        paint: 'paint',
        dBrush: 'deleteBrush',
        size: 'size',
        btn: 'btn',
        stop: 'ion-stop',
        pause: 'ion-pause'
    }

    // Mouse position
    function calculateMousePosition(event) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = event.clientX - rect.left - root.scrollLeft;
        var mouseY = event.clientY - rect.top - root.scrollTop;

        return {
            x: mouseX,
            y: mouseY
        }
    }

    // Paint
    function paint(radius, color) {
        canvas.onmousedown = function (e) {
            isDrawing = true;
        };
        canvas.onmousemove = function (e) {
            if (isDrawing) {
                var position = calculateMousePosition(e);
                circle(position.x, position.y, radius, color);
            }
        };
        canvas.onmouseup = function () {
            isDrawing = false;
        };
    }

    // Draw a circle
    function circle(x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
    }

    function clearStop() {
        document.getElementById(DOMStrings.btn).classList.remove(DOMStrings.stop);
        document.getElementById(DOMStrings.btn).classList.add(DOMStrings.pause);
        document.getElementById(DOMStrings.btn).classList.remove(DOMStrings.stop);
    }

    function clearPause() {
        document.getElementById(DOMStrings.btn).classList.remove(DOMStrings.pause);
        document.getElementById(DOMStrings.btn).classList.add(DOMStrings.stop);
    }

    // Clear canvas
    function clearCanvas() {
        document.getElementById(DOMStrings.btn).classList.remove(DOMStrings.pause);
        document.getElementById(DOMStrings.btn).classList.add(DOMStrings.stop);
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    // FUNCTIONS
    return {
        getInput: function () {
            return {
                red: parseInt(document.getElementById(DOMStrings.r).value),
                green: parseInt(document.getElementById(DOMStrings.g).value),
                blue: parseInt(document.getElementById(DOMStrings.b).value),
                alpha: parseFloat(document.getElementById(DOMStrings.a).value),
                radius: parseInt(document.getElementById(DOMStrings.radius).value),
                random: parseInt(document.getElementById(DOMStrings.rdn).value),
                randomAlpha: parseFloat(document.getElementById(DOMStrings.rdnAlpha).value),
            }
        },

        drawCircle: function (x, y, radius, color) {
            circle(x, y, radius, color);
        },

        drawPaint: function (radius, color) {
            return paint(radius, color);
        },

        clear: function () {
            clearCanvas(canvas, ctx);
        },

        getBtnStop: function () {
            clearStop();
        },

        getBtnPause: function () {
            clearPause();
        },

        getDOMstrings: function () {
            return DOMStrings;
        }
    }
})(canvas, ctx);

//************************************************************************************************************
//**************************************      CONTROLLER      ************************************************
//************************************************************************************************************


var controller = (function (paintCTRL, UICTRL) {

    var setupEventListeners = function () {
        var DOM, canvas, ctx, x, y, position;
        window.onload = function () {
            DOM = UICTRL.getDOMstrings();

            // Open an image on canvas
            function el(id) {
                return document.getElementById(id);
            } // Get elem by ID

            var canvas = el("gameCanvas");
            var context = canvas.getContext("2d");

            function readImage() {
                if (this.files && this.files[0]) {
                    var FR = new FileReader();
                    FR.onload = function (e) {
                        var img = new Image();
                        img.addEventListener("load", function () {
                            context.drawImage(img, 0, 0);
                        });
                        img.src = e.target.result;
                    };
                    FR.readAsDataURL(this.files[0]);
                }
            }

            el("fileUpload").addEventListener("change", readImage, false);

            // B&W filter
            document.getElementById('getData').addEventListener('click', bw);

            function bw() {

                document.getElementById('wait').innerHTML = 'processing';

                window.setTimeout(abstractFilter, 500);

                function abstractFilter() {

                    var imgd = context.getImageData(0, 0, 800, 500);
                    var pixels = imgd.data;
                    var width,
                        height,
                        colorFactor,
                        grayscale,
                        grayscale2,
                        radius,
                        r, g, b, a,
                        differenceGrayscale;

                    context.fillStyle = '#000000';
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    
                    colorFactor = UICTRL.getInput();
                    

                    for (height = 0; height < 500; height++) {
                        for (width = 0; width < 800; width++) {
                            var index = (width + height * 800) * 4;
                            var index2 = index + 1;

                            grayscale = pixels[index] * (colorFactor.red / 255) + pixels[index + 1] * (colorFactor.green / 255) + pixels[index + 2] * (colorFactor.blue / 255);

                            grayscale2 = pixels[index2] * 0.3 + pixels[index2 + 1] * 0.1 + pixels[index2 + 2] * 0.5;

                            differenceGrayscale = 255 / (grayscale2 - grayscale);

                            if (differenceGrayscale < 0) {
                                differenceGrayscale = differenceGrayscale * (-1);
                            }

                            r = pixels[index + 0];
                            g = pixels[index + 1];
                            b = pixels[index + 2];

                            // When the pixels are tendent to white alpha tent to 1
                            a = (grayscale2 - grayscale) / (grayscale2 + grayscale);

                            var RGBA = paintCTRL.getRGBAPhoto(r, g, b, a);

                            //DRAW A CIRCLE   x, y, radius, colors
                            UICTRL.drawCircle(width, height, differenceGrayscale, RGBA.colorsPhoto);
                        }
                    }
                    document.getElementById('wait').innerHTML = ' ';
                }
            }

            // Color picker
            var el = document.querySelector('input[type="text"]');
            el.onmousedown = function () {
                var picker, colorBackground;
                picker = new CP(document.querySelector('input[type="text"]'));
                picker.on("change", function (color) {
                    this.target.value = '#' + color;

                    canvas = document.getElementById('gameCanvas');
                    ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#' + color;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                });
            }

            //RETURN AN OBJECT WITH FIBONACCI BLUR AND COLORS
            function allColors() {
                var input, r, g, b, a, RGBA;

                //GET INPUT
                input = UICTRL.getInput();

                // RANDOM COMPONENTS
                r = paintCTRL.getrRGb(input.random);
                g = paintCTRL.getrRGb(input.random);
                b = paintCTRL.getrRGb(input.random);
                a = paintCTRL.getrRGb(input.randomAlpha);

                //RETURN COLORS AND FIBONACCI BLUR
                RGBA = paintCTRL.getRGBA(input, r, g, b, a);
                return RGBA;
            }

            // START BUTTON **************************************************************
            document.getElementById(DOM.startP).addEventListener('click', function (stopPaint) {

                UICTRL.getBtnStop();

                // DISPLAY STOP BUTTON
                stopPaint = function stop() {

                    // DISPLAY PAUSE BUTTON
                    UICTRL.getBtnPause();

                    clearInterval(paint);
                }

                document.getElementById(DOM.stopP).addEventListener('click', stopPaint);

                // START DRAW RANDOM
                var paint = setInterval(function () {

                    //GET POSITION
                    position = paintCTRL.paintLogic(canvas, x, y);

                    var RGBA = allColors();

                    //DRAW A CIRCLE
                    UICTRL.drawCircle(position.pointX, position.pointY, RGBA.fibonacciBlur, RGBA.colors);
                }, 0);
            });
            document.getElementById(DOM.dBrush).addEventListener('click', UICTRL.clear);

            setInterval(function () {

                var RGBA = allColors();

                //PAINT
                UICTRL.drawPaint(RGBA.fibonacciBlur, RGBA.colors);
            }, 0);
        }
    }

    return {
        init: function () {
            setupEventListeners();
        }
    }
})(paintController, UIController);

controller.init();








//context.putImageData(imgd, 0, 0);
