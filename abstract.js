
var canvas, ctx, x, y, position;

//slider control


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    x = canvas.width/2;
    y = canvas.height/2;

    position = logic();
    
    document.getElementById('startPaint').addEventListener('click', function(stopPaint) {
        var stopPaint = function stop() {
        clearInterval(paint);
        }
        document.getElementById('stopPaint').addEventListener('click', stopPaint);

            var paint = setInterval(function() {
                var r, g, b, a, red, green, blue, alpha, random, randomAlpha, radius, color1, color2, color3, color4, color5, color6, color7, color8, color9, color10;
                position = logic();
                random = parseInt(document.getElementById('random').value);
                r = Math.round(random * (Math.random() < 0.5 ? -1 : 1) * 2);
                g = Math.round(random * (Math.random() < 0.5 ? -1 : 1) * 2);
                b = Math.round(random * (Math.random() < 0.5 ? -1 : 1) * 2);
                
                randomAlpha = parseFloat(document.getElementById('randomAlpha').value);
                a = (Math.random() < 0.5 ? (-Math.random() * randomAlpha) : (Math.random() * randomAlpha));
                
                red = parseInt(document.getElementById('red').value) + r;
                green = parseInt(document.getElementById('green').value) + g;
                blue = parseInt(document.getElementById('blue').value) + b;
                alpha = parseFloat(document.getElementById('alpha').value) +a;
                radius = parseInt(document.getElementById('radius').value);
                //console.log(a, red, green, blue, alpha, radius);
                
                color1 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 512) + ')';
                color2 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 256) + ')';
                color3 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 128) + ')';
                color4 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 64) + ')';
                color5 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 32) + ')';
                color6 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 6) + ')';
                color7 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 4) + ')';
                color8 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 2) + ')';
                color9 = 'rgba(' + red + ',' + green + ',' + blue + ',' + (alpha / 1.5) + ')';
                color10 = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
                
                circle(position.pointX, position.pointY, (radius * 2), color1);
                circle(position.pointX, position.pointY, (radius * 1.9), color2);
                circle(position.pointX, position.pointY, (radius * 1.8), color3);
                circle(position.pointX, position.pointY, (radius * 1.7), color4);
                circle(position.pointX, position.pointY, (radius * 1.6), color5);
                circle(position.pointX, position.pointY, (radius * 1.5), color6);
                circle(position.pointX, position.pointY, (radius * 1.4), color7);
                circle(position.pointX, position.pointY, (radius * 1.3), color8);
                circle(position.pointX, position.pointY, (radius * 1.2), color9);
                circle(position.pointX, position.pointY, radius, color10);
                //console.log(position.pointX, position.pointY);
            }, 0);
    });
    
    function circle(x, y, radius, color) {
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.fill();
}

    function logic() {

      x += ((Math.random() < 0.5 ? -1 : 1) / 2) - ((Math.random() < 0.5 ? -1 : 1) * 2);
      y += ((Math.random() < 0.5 ? -1 : 1) / 2) - ((Math.random() < 0.5 ? -1 : 1) * 2);
        //console.log(x, y);

      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
        x = canvas.width/2 + (Math.random() < 0.5 ? -1 : 1) / 2;
        y = canvas.height/2 + (Math.random() < 0.5 ? -1 : 1) / 2;
      } return {
          pointX: x,
          pointY: y
      }
    }
}


