# Sole&Ankle, Revisited — Module 5 workshop

In the Flexbox module, we built an e-commerce store:

![A screenshot of the original Flexbox module workshop](./docs/original-desktop.png)

In this workshop, we'll make this application responsive, so that it looks great and works well on phones and tablets:

![A GIF showing how the design changes across viewport widths](./docs/resize-demo.gif)

The design can be found on Figma:

- https://www.figma.com/file/kAL3AumTUV11y1IqHhltB6/Sole-and-Ankle-%E2%80%94-Mockup

We'll use a **desktop-first** approach for this process, and our breakpoints will be set as follows:

| Name   | Width (px) | Width (rem) |
| ------ | ---------- | ----------- |
| phone  | 600        | 37.5        |
| tablet | 950        | 59.375      |
| laptop | 1300       | 81.25       |

## Troubleshooting

If you run into problems running a local development server, check out our [Troubleshooting Guide](https://courses.joshwcomeau.com/troubleshooting) on the course platform.

---

## Exercise 1: Set up our breakpoints

Before we start tweaking the UI, let's add some structure to make it easy for us to use media queries.

It's up to you how you'd like to structure it! You can use the strategy discussed in [the “breakpoints” lesson](https://courses.joshwcomeau.com/css-for-js/05-responsive-css/07-breakpoints#managing-breakpoints), or you can use [styled-components' “theming” feature](https://styled-components.com/docs/advanced#theming).

Whichever approach you choose, your breakpoints should be specified in rems (not pixels). I suggest storing them in the `/src/constants.js` file.

This first exercise is about setup. We’ll use these breakpoints in the subsequent exercises.

## Exercise 2: Mobile header

On smaller screens, we want to switch up our header:

![Close-up screenshot of the new header](./docs/mobile-header.png)

Our `SuperHeader` is removed, replaced with a decorative dark-gray line. The `Header`'s navigation is replaced by 3 icon buttons.

On mobile, a lot of the spacing gets tightened up.

**I recommend checking your work on a real mobile device.** You can use ngrok, as described in [the “Mobile Testing” lesson](https://courses.joshwcomeau.com/css-for-js/05-responsive-css/03-mobile-testing).

## Exercise 3: Tweaks to our main view

On portrait tablet, our left-hand column disappears.

The categories are really more of a nice-to-have, so they're removed. The breadcrumbs, though, are important for navigation, so they move to sit just above the category heading:

![Screenshot of the new breadcrumbs on tablet/phone](./docs/tablet-breadcrumbs.png)

On mobile, we lose the "Sort" filter as well:

![Screenshot of the top part of the screen on mobile, showing a gap where the “sort” filter was](./docs/mobile-no-sort-filter.png)

## Exercise 4: Mobile menu

Alright, let's implement the hamburger menu!

For convenience, a new component has been created for you, `MobileMenu`. It's not really a modal yet, though. Your job is to make it look _and_ act like a modal, so that clicking on the hamburger menu opens the mobile navigation:

STOPSHIP GIF

You'll need to update the hamburger-menu button we added in Exercise 2 to flip `showMobileMenu` to `true`.

Earlier in this module, we saw how to [build an accessible modal component](https://courses.joshwcomeau.com/css-for-js/05-responsive-css/05-exercises#bonus-building-accessible-modals) using Reach UI. Sadly, Reach UI is no longer actively maintained, so for this exercise, we’ll use Radix Primitives instead.

**This is a particularly tricky challenge.** It will involve a substantial amount of React-specific work, reading the Radix documentation and figuring out how to apply it in this project. If you haven’t worked with React much, I recommend skipping this exercise.

This repository already has Radix Primitives installed. Here’s the relevant page from their documentation:

- https://www.radix-ui.com/primitives/docs/components/dialog

## Exercise 5: Fluid desktop navigation

As it stands, our desktop navigation disappears _just_ before it runs out of space:

![Close-up GIF of the header. As the window shrinks, the layout changes just before the nav hits the edge](./docs/nav-barely-fits.gif)

What happens, though, if our Marketing friends rename the categories? Or, what happens when we internationalize the project, and the category names are rendered in a longer language?

![Screen recording of our site with French navigation links. They don't fit, so they spill out the side, causing a page-wide horizontal scroll.](./docs/french-nav-overflow.gif)

We can do two things to make this better:

1. Manage the overflow in the header to scroll this section when it doesn't fit.
2. Use fluid gaps between the nav links, to reduce the likelihood that this'll be required.

Here's our goal:

![Same situation, except now the spacing between items stretches and squashes depending on window width, and when the window gets too small, the content overflows with a scrollbar spanning the header](./docs/french-nav-overflow-fixed.gif)

**NOTE:** Your solution doesn't have to match this GIF _exactly_. Don't worry about picking the perfect numbers! You can use the [“Fluid Calculator” tool](https://courses.joshwcomeau.com/css-for-js/05-responsive-css/16-fluid-calculator) to get close enough

## Exercise 6: Theming with CSS Variables

As it stands, we have a few colors in our `constants.js` file. When we want to use a color, we import and interpolate it:

```jsx
import { COLORS } from '../../constants';

const Something = styled.p`
  color: ${COLORS.gray[900]};
`;
```

This works fine, but I personally prefer to use CSS variables for colors. It makes it a bit easier to write:

```jsx
const Something = styled.p`
  color: var(--color-gray-900);
`;
```

In this exercise, your goal is to update the project to use CSS variables for colors, and optionally font-weights.

**BONUS:** The modal backdrop should use a CSS variable that is created using fragments from the main colors.
