# Abstract

<h1>Be an artist with the Abstract APP. Well, almost.</h1>


For sure you will get confident with the combination of colors, learning how to combine additive primary color to abtain other colors.

<h2>What is Abstract?</h2>

Written in Javascript, that draws randomly circles. With this app you can get something like this:

![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/Canvas.png?raw=true)

![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/Canvas%20(5).png?raw=true)


You can start immidiatly using <strong>Abstract</strong> here https://ivovacca.com/abstract


I started this APP from a simple function that draws dots randomly on a canvas.

The effect was nice, than I decided to build a simple UI.

This is the first version.

![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/abstract.jpg?raw=true)

Basically when you press Start button, setInterval begins with its cycles and gets a new random position (in a certain range that I defined) and than assigned to x and y.

![Abstract canvas](https://github.com/ivovacca/abstract/blob/master/Examples/abstract_5.jpg?raw=true)

I was looking for a effect blur that, when the circle is small, it must be defined, and when it is big, it must be almost transparent.

So I decided to try to implement Fibonacci for obteining a nice blur-glowing.

<h3> How Fibonacci blur works</h3>

I used the composite principle to write this effect, it's similar to "composite add" or "composite screen". This blur is the sum of many layers overlapping each other at the same position for a certain number values in an array input. I used an array with 6 values. The smalest circle is much defined respect the bigger. The bigger it is, the more transparent it is.

When you increase the radius, alpha tends to 0.

![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/Canvas%20(1).png?raw=true)
![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/Canvas%20(2).png?raw=true)
![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/Canvas%20(4).png?raw=true)

I found it is an interesting result.

Because the code was getting bigger, I decide wrote again all program, now it is more understable, if you want to take a look.

<h1>It is organized in three modules:</h1>

<h3>1: paintController = the logic of the app</h3>

<h3>2: UICotroller = display everything</h3>

<h3>3: controller = his job is to pass data between the first and the second module.</h3>



This is the last version 1.2

![Abstract canvas](https://raw.githubusercontent.com/ivovacca/abstract/master/Examples/version_1.2.jpg?raw=true)

If you want to implement a color-picker, there a lots of project about it.

I found this one https://tovic.github.io/color-picker simple and well done. Very interesting project.

I implemented it in the online version. Take a look here https://ivovacca.com/abstract



If you use the app, please post your abstract on Twitter with #abstract and let me know you impression.

Move the sliders and have fun painting your abstract image.

Thank you very much for your interest.

* HINT: If you dont't choose a background color you can save the canvas with alpha.
