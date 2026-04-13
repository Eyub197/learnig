// Always register the plugins you're using!
gsap.registerPlugin(ScrollTrigger);

// --- 1. THE TWEEN: The basic animation unit ---
// A "tween" is a single animation of one or more properties on one or more targets.
// The most common method is gsap.to(), which animates TO the specified state.

console.log("Animating .box1");
gsap.to(".box1", {
  // Properties to animate
  x: 300, // Move 300px on the x-axis
  rotation: 360, // Rotate 360 degrees

  // Special properties (control how the animation behaves)
  duration: 2, // The animation will take 2 seconds
  delay: 1, // Wait 1 second before starting
  ease: "bounce.out", // The "vibe" of the animation. See GSAP's Ease Visualizer.

  // Lifecycle hooks
  onComplete: () => {
    console.log("Box 1 animation complete!");
  },
});

// Other common tweens:
// gsap.from(".box", { ... }) // Animates FROM the specified state
// gsap.fromTo(".box", { fromState }, { toState }) // Explicitly set start and end

// --- 2. TIMELINES: For sequencing animations ---
// If you have multiple animations, don't use delays. Use a timeline!
// A timeline is a container for tweens.

const tl = gsap.timeline({
  // You can add defaults to all tweens in the timeline
  defaults: { duration: 0.75, ease: "power2.out" },
});

// Add tweens to the timeline. They will play in sequence.
tl.to(".circle", { y: -50, scale: 1.2 });
tl.to(".circle", { x: 100 });
tl.to(".circle", { y: 0, scale: 1 });

// --- 3. STAGGERING: Animating groups of elements ---
// The `stagger` property is one of GSAP's most powerful features.
// It lets you apply the same animation to multiple targets with a slight delay between each.

console.log("Staggering circles animation");
gsap.to(".circle", {
  y: -100,
  duration: 1.5,
  ease: "power1.inOut",
  repeat: -1, // Repeat indefinitely
  yoyo: true, // Animate back and forth
  // The stagger magic!
  stagger: 0.2, // Each circle will start its animation 0.2s after the previous one
});

// --- 4. SCROLLTRIGGER: Animate on scroll ---
// This is the most important plugin for modern web animation.

console.log("Setting up ScrollTrigger for .box2");
gsap.to(".box2", {
  x: 400,
  duration: 3,

  // The ScrollTrigger object
  scrollTrigger: {
    trigger: ".box2", // The element that triggers the animation

    // The start and end points of the animation
    // "top center" means "when the top of the trigger element hits the center of the viewport"
    start: "top center",
    end: "bottom top",

    // What to do when the trigger enters/leaves the viewport.
    // play, pause, resume, reset, restart, complete, reverse, none
    toggleActions: "play pause resume reset",

    // --- The TWO most important ScrollTrigger properties ---

    // 1. scrub: Links the animation progress directly to the scrollbar.
    //    A value of `true` is a 1-to-1 link. A number (e.g., 1) adds a slight smoothing.
    scrub: 1,

    // 2. markers: Shows the start and end markers. ESSENTIAL for debugging.
    //    Remove this in production!
    markers: true,
  },
});

gsap.to(".one", {
  x: 200,
});

gsap.to(".two", {
  y: 200,
  duration: 2,
});

gsap.to(".invinsible", {
  opacity: 0,
});

const timelineRotate = gsap.timeline({
  defaults: { duration: 1, delay: 1 },
});

timelineRotate.to(".rotate", {
  rotation: 15,
});

timelineRotate.to(".rotate", {
  rotation: 30,
});

timelineRotate.to(".rotate", {
  rotation: 45,
});

timelineRotate.to(".rotate", {
  rotation: 60,
});

timelineRotate.to(".rotate", {
  rotation: 90,
});
