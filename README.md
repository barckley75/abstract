# Abstract

<h1>You can play <strong>Abstract</strong> here: ivovacca/abstract.com</h1>


I started this APP from a simple function that draws dots randomly on a canvas.

The effect was nice, than I decided to build a simple UI.

![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/abstract.jpg?)

Basically when you press Start button, setInterval begins with its cicles and gets a new random position (in a certain range), assigned to x and y.

This is the old version.

![Abstract canvas](https://github.com/ivovacca/abstract/blob/master/Examples/abstract_5.jpg?)

I was looking for a blur that, when the circle is small it must be defined, and when it is big must be almost transparent.

So I decided to try to implement Fibonacci for obteining a nice blur-glowing.

<h3> How Fibonacci blur works</h3>

I used some skills from my composting background to write this effect. This blur is the sum of many layers overlapping each other in the same position for a certain number values in input. I used an array with 6 values. The smalest is much defined respect than the bigger. The bigger it is, the more transparent it is.

When you increase the radius, alpha tends to 0.

![Abstract canvas](![Abstract canvas](https://github.com/ivovacca/abstract/blob/master/Examples/Canvas%20(1).png?raw=true)?raw=true)

![Abstract canvas](![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/Canvas%20(2).png?raw=true)?raw=true)

![Abstract canvas](![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/Canvas%20(4).png)?raw=true)

I found it an interesting result.

I wrote again the code, now it is more understable.

<h1>It is organized in three modules:</h1>

<h3>1: paintController = the logic of the app</h3>
<h3>2: UICotroller = display everything</h3>
<h3>3: controller = his job is to pass data between the first and the second.</h3>

This is the last version.

![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/UI%20version%201.1.jpg?raw=true)

If you use the app, please post your abstract on Twitter with #abstract and let me know you impression.

Move the sliders and have fun painting your abstract image.

If you want to implement a color-picker, I found this one very interesting https://tovic.github.io/color-picker/

Thank you very much for your interest.

HINT: If you dont't choose a background color you can save the canvas with alpha.
