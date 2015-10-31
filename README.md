# Tadaaam

You need your animations to trigger every time the element enters the viewport? Well, that comes out of the box with our plugin. More, you'll be able to set a delay on the animation, an offset, the number of times you want it to animate, and the duration of it. All of this via data attributes!

Tadaam is a lightweight, well-structured plugin, built on jQuery and animate.css. You can fully enjoy all the animations provided by animate.css, enhanced with your own customizations.

### Basic Usage

1. Include jquery and animate.css
  ```
  <link rel="stylesheet" href="/path-to-css/animate.css"/>
  <script src="/path-to-script/jquery.min.js"></script>
  ```

2. Include tadaaam.js
  ```
  <script src="/path-to-script/tadaaam.js"></script>
  ```

3. Add **data-animation** attribute ([here](https://daneden.github.io/animate.css/) is a list of the animations you can use).
  ```
  <div class="element" data-animation="bounceIn"></div>
  ```

### Options

Alongside setting the type of the animation (data-animation), you can also set:

  - **data-delay**
    - default: 0
  - **data-offset**
    - default: 0
    - animation starts after the element enters the viewport and passes this value
  - **data-duration**
    - default: 1000
    - this is measured in milliseconds
  - **data-repeat**
    - default: 1
    - you can also use the value "infinite"