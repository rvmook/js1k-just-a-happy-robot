JS1K - Just a Happy Robot
=========================
This is my submission for the [2014 JS1K competition](http://js1k.com/2014-dragons/).
It's a code golfing competition where you have to create a demo within 1024 bytes of JavaScript.



How to view the demo
--------------------
Nothing to compile. Just open the `entry.html` file in your browser.

Use left and right keys to move and space bar to jump.
There's no goal, the robot is just happy to skip around his tiny little world.



Features
--------
- Walking, jumping and swimming animation
- Hit detection
- Endless scrolling world
- Sea expends based on browser width *(aka doesn't break when you resize it)*



Files in this repo
------------------
- `shim.html`

  The base file found on the JS1K site that is used as the base of the submission.

- `entry.js`

  The orignal source of my submission.

- `entry.min.js`

  The manual minified version of the `entry.js` file.

- `entry.html`

  The actual end result of the demo.



About the process
-----------------
I thought it would be more fun to minify the code by hand rather then using a minifier.
So I started out writing `entry.js` with the minifications in mind.



JavaScript golfing references used
----------------------------------
When writing this these sources gave me a lot of guidance on how to optimize my code for minification:

- https://marijnhaverbeke.nl/js1k/
- http://www.claudiocc.com/javascript-golfing/