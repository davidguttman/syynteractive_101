This page can be found at:  [https://github.com/davidguttman/syynteractive_101/blob/master/readme.md](https://github.com/davidguttman/syynteractive_101/blob/master/readme.md)

---

# Interactive Visuals 101

* Getting up and running
* Drawing to the Canvas
* Mouse and Keyboard Interactivity
* Using external APIs (Twitter, ColourLovers)
* Sound reactivity
* Helpful patterns
* Hosting and Serving


## Getting up and running

1.  Download the project directory: [https://github.com/davidguttman/syynteractive_101/zipball/master](https://github.com/davidguttman/syynteractive_101/zipball/master)

2.  Extract it someplace convenient

3.  Open the directory in your text editor

4.  Open <code>project/index.html</code> in Chrome. 

5.  You should see a white page with a grey box.

6.  Open Chrome's javascript console: CMD/CTRL + ALT + J

7.  You should see <code>Welcome to Interactive Visuals 101!</code>


## Drawing to the Canvas

Now that we're in business, let's draw.

There are two main functions that a Processing script will rely on: <code>setup</code> and <code>draw</code>.

<code>setup</code> gets called only once at the beginning, and <code>draw</code> will be called every frame (60 times per second by default).

Let's work with <code>setup</code> for right now.

---

First things first. This canvas is too small and nobody likes that color grey.

Any time we want to use one of Processing's awesome methods, we will preface it by the internal name we give to our Processing instance. In this case we (I) chose <code>p5</code>.

### Canvas Size ###

We want to change the size of the canvas. Will it surprise you that processing's method of doing this is by using a function named <code>size</code>?

<code>size</code> takes two arguments, width and height, and is called like so:

    size(width, height);

or in our case if we wanted to change both the width and height to 400:

    p5.size(400, 400);


### Background Color ###

And now, let's change the background color.

<code>background</code> takes three arguments: red, green, and blue. 

    background(red, green, blue);

By default Processing will accept color values that range from 0-255. This means that:

    black is    0,    0,    0
    white is    255,  255,  255
    grey is     127,  127,  127
    red is      255,  0,    0
    green is    0,    255,  0
    blue is     0,    0,    255
    yellow is   255,  255,  0
    purple is   255,  0,    255

I'm in the mood for a dark grey, almost black:

    p5.background(30, 30, 30);

---

Great, now we know how to set up our canvas the way we want. Let's actually draw something.

Ok, I know it's not the most exciting thing in the world, but let's start with a rectangle.

<code>rect</code> takes four arguments, x, y, width, and height:

    rect(x, y, width, height);

<code>x</code> is the number of pixels from the left edge of the canvas, and <code>y</code> is the number of pixels from the top edge. <code>width</code> and <code>height</code> will determine the shape and size of your rectangle.







<!-- Mouse position to bg color for map example -->