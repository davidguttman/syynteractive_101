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

First things first. This canvas is too small and nobody likes that shade of grey.

### Canvas Size ###

We want to change the size of the canvas. Will it surprise you that processing's method of doing this is by using a function named <code>size</code>?

<code>size</code> takes two arguments, width and height, like so:

    size(width, height);

However, any time we want to use one of Processing's awesome methods, we will preface it by the internal name we give to our Processing instance. In this case we (I) chose <code>p5</code>.

If we wanted to change both the width and height to 400:

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


### Drawing a Rectangle ###

Ok, I know it's not the most exciting thing in the world, but let's start with a rectangle.

<code>rect</code> takes four arguments, x, y, width, and height:

    rect(x, y, width, height);

<code>x</code> is the number of pixels from the left edge of the canvas, and <code>y</code> is the number of pixels from the top edge. <code>width</code> and <code>height</code> will determine the shape and size of your rectangle.

If we want to draw a rectangle 200px from the top and 200px from the left, and we want it to be 100px by 100px:

    p5.rect(200, 200, 100, 100);

Success!

#### Positioning ####

At this point you may notice that the x and y arguments for the <code>rect</code> method signify the placement of the top left corner of the rectangle. 

What if we wanted the rectangle to be centered?

One way is to simply reduce the x value by half of the width, and y by half of the height.

In our code it would look like this:

    // Store the width, height, and coordinates of the center we want
    var w = 100,
        h = 100,
        cX = 200,
        cY = 200;

    // Calculate the new x and y
    var x = cX - (w/2),
        y = cY - (h/2);

    // Use them in our rect function
    p5.rect(x, y, w, h);

(Processing does have a built-in function for changing rectangle placement, but this is a very useful pattern to learn, as it will come up repeatedly.)



### Fill and Stroke ###

Ok, I get it, you like rectangles, but for some reason the idea of only being able to draw white rectangles bothers you.

Here's how we can use color in Processing.

Processing has two methods, <code>fill</code> and <code>stroke</code> that can be used to set the color for points, lines, and shapes. Each of these methods take four arguments, red, green, blue, and alpha:
  
    fill(red, green, blue, alpha);
    stroke(red, green, blue, alpha);

This behaves exactly like <code>background</code> above, except that we can also affect the transparency (which ranges from 0, completely transparent, to 255, completely opaque. 

If I wanted a semi-transparent blue fill with an opaque white border I might do something like this:

    p5.fill(20, 100, 200, 80);
    p5.stroke(255, 255, 255, 255);

    p5.rect(200, 200, 100, 100);


Each of these methods will set a color for all fills and all strokes that follow.

In other words, Processing can only have one magic marker in its hand at one time, but you can switch it out at any point.

Here's an example of drawing two shapes with different colors:

    // First, our square from above
    p5.fill(20, 100, 200, 80);
    p5.stroke(255, 255, 255, 255);

    p5.rect(200, 200, 100, 100);


    // Now for something different:
    p5.fill(150, 50, 10, 150);
    p5.stroke(250, 150, 110, 150);

    p5.rect(250, 250, 100, 100);


---

## Interactivity ##

Now that we've learned how to create static visuals, let's move on to interactivity.

Any commands in <code>draw()</code> will be run once per frame. This is where we want to put any reactive code.

### Mouse Basics ###

Processing gives us some convenient methods to track mouse movements and clicks. Let's try them out.

<code>mouseX</code> and <code>mouseY</code> will give us the current coordinates of the mouse. <code>pMouseX</code> and <code>pMouseY</code> tell use the mouse's previous position. 

This time we'll draw a line. Lines are very simple in Processing. They're created by calling <code>line()</code> and passing in four arguments: x1, y1, x2, y2. 

Therefore, if we wanted to use the mouse to draw:

    p5.draw = function() {

      // change our stroke to white
      p5.stroke(255, 255, 255, 80);

      // draw a line from the previous location to the current location
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
      
    };
    

### Storing Variables ###

In creating more complex visuals, we'll need to store information. do this by creating variables. Let's create variables for x and y values that we can use later:

    p5.mouseClicked = function() {
      // we can store stuff on 'self' and it will be accessible in other places in the code.
      self.x = p5.mouseX;
      self.y = p5.mouseY;
    };

Whenever we click, this code will store the x and y positions of our mouse into those two variables <code>self.x</code> and <code>self.y</code>.

Let's use those values in draw instead of <code>pmouseX</code> and <code>pmouseY</code> for a more interesting effect:

    if (self.x) {
      p5.line(self.x, self.y, p5.mouseX, p5.mouseY);
    };

So you may have noticed that we wrapped our line in a conditional statement. What this means is that we won't try to draw a line if we don't have a value for self.x yet (i.e. we haven't clicked yet).


### More Variables and Conditionals ###

What if we wanted to record mouse movements so that we could replay them back?

There will be a couple parts to this:

  * A list to store mouse movements
  * Keeping track of whether we are in 'recording' or 'playback' mode
  * drawing stored mouse movements

In JavaScript you can create an empty array (list) like this:

    var myArray = [];

You can then add to it using its <code>push()</code> method:

    myArray.push('a');
    myArray.push('b');
    myArray.push('c');

This would be identical to creating an array like this:

    myArray = ['a', 'b', 'c'];

Then you can access its data with square brackets and an index:

    myArray[0] === 'a';
    myArray[1] === 'b';
    myArray[2] === 'c';



    




<!-- Mouse position to bg color for map example -->