/* ************************************************************ */
/* ************************* ABSTRACT ************************* */
/* ********* draw an abstract with a random painter *********** */
/* *********************** by Ivo Vacca *********************** */
/* ************************************************************ */



var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');


//****************************************************************
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

            var fib = [radius, radius + 1, radius + 2, radius + 3, radius + 16, radius + 32];

            for (var i = 0; i < fib.length; i++) {
                color = [];
                color[i] = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / fibonacci(fib[i])) + ')';
                return {
                    fibonacciBlur: fib[i],
                    colors: color[i]
                }
            }
        },
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
                ctx.lineTo(position.x, position.y);
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
                ctx.fill();
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
