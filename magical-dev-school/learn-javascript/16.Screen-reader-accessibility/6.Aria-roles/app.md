
Document structure roles helps to organise content. There are 26 document structure roles. Most of them aren’t interactive.

Here’s the list of document structure roles.

    application
    article
    cell
    columnheader
    definition
    directory
    document
    feed
    figure
    group
    heading
    img
    list
    listitem
    math
    none
    note
    presentation
    row
    rowgroup
    rowheader
    separator (when not focusable)
    table
    term
    toolbar
    tooltip

Roles that are built into HTML

Of these 26 roles, 15 have been built into HTML.
Role	HTML Element
article	<article>
cell	<td>
columnheader	<th> (when used in <thead>)
definition	<dd>
figure	<figure>
heading	<h1> to <h6>
img	<img>
list	<ol> and <ul>
listitem	<li>
row	<tr>
rowgroup	<thead> and <tbody>
rowheader	<th> when used in a <tr>
separator	<hr>
table	<table>
term	<term>

Do you find most of these HTML elements familiar? If yes, good. That means you have a good grasp of HTML. It also means you already know the most important aria-roles!
The remaining roles

From the remaining 11 document structure roles, these are the relatively more important ones:

    Feed
    Group
    None/Presentation
    Tooltip

You’ll almost never use these roles:

    Application
    Directory
    Document
    Math
    Note
    Toolbar

Explanation of each document structure role

Application tells screen readers that element and its descendants should be treated like a desktop application (not a website). It causes screen readers to enter application mode. You won’t need application 99.9% of the time.

<div role="application">...</div>

Article is a group of elements that can form an independent part of a page. It’s usually used to contain article-like information like a blog post, form post, newspaper article, etc.

<article>...</article>

Cell, columnheader, row, rowgroup, rowheader, and table are roles related to a table. These roles are built into <table>, <thead>, <tbody>, <tr>, <th> and <td> elements. Here’s a simple way to visualise these role mappings:

<table>
  <!-- table        -->
  <thead>
    <!-- rowgroup     -->
    <tr>
      <!-- row          -->
      <th>Column 1</th>
      <!-- columnheader -->
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <!-- rowgroup     -->
    <tr>
      <!-- row          -->
      <th>Row 1</th>
      <!-- rowheader    -->
      <td>Item</td>
      <!-- cell         -->
    </tr>
  </tbody>
</table>

Term refers to a word or phase you want to define. Definition is the definition of the term. They’re built into <dt> and <dd> elements respectively.

<dl>
  <dt>Apple</dt>
  <!-- term -->
  <dd>The round fruit of a tree of the rose family</dd>
  <!-- definition -->
</dl>

Directory is used for a static table of contents. This role is not well supported across screen readers.

Document tells screen readers to browse the content in Reading mode. It’s only useful if you use it in conjunction with the application role.

Feed contains a list of <article>s that are added to (or removed) as a user scrolls through a page. This is only useful if you create an infinite-scrolling page.

<section role="feed" aria-busy="false">
  ...
  <article>...</article>
  <article>...</article>
  <article>...</article>
  ...
</section>

Figure contains content that may contain an image, code, etc. The <figure> element contains an implicit figure role. Make sure you add an accessible name or description to the <figure>. Read why on Scott O’Hara’s article related to figure.

<figure role="figure" aria-label="repeat figcaption content here">
  <!-- figure content. if an image, provide alt text -->
  <figcaption>Caption for the figure.</figcaption>
</figure>

Group denotes a group of content that’s not large enough to warrant a landmark role (and doesn’t fall into other document structure roles).

<div role="group">...</div>

Heading is the heading for a section of a page. They’re built into <h1>, <h2>, <h3>, <h4>, <h5>, and <h6>.

<h1>...</h1>
<h2>...</h2>
<h3>...</h3>
<h4>...</h4>
<h5>...</h5>
<h6>...</h6>

Img denotes an image. The <img> element contains an implicit img role.

<img src="..." alt="..." />

List denotes a list. The <ol> and <ul> elements have an implicit list role. Listitem denotes an item in a list. The <li> element has an implicit listitem role.

<ul>
  <li>...</li>
</ul>

<ol>
  <li>...</li>
</ol>

Math denotes content that represents a mathematical expression.

None and presentation roles mean the same thing. They denote elements that are presentational. When an element is marked as presentational, screen readers will NOT announce their roles.

<!-- Screen readers won't say 'button' here -->
<button role="none">...</button>
<button role="presentation">...</button>

Note is for content that supports the primary content.

<div role="note">...</div>

Separator is for separating elements. The <hr> element has an implicit separator role.

<hr />

Toolbar is a list of commonly used buttons displayed in a horizontal manner.

<div role="toolbar">
  <button>...</button>
  <button>...</button>
  <button>...</button>
</div>

Tooltip denotes a popup that becomes visible when an element receives mouse hover (or keyboard focus). Tooltips are displayed only after a short delay (of 1-5 seconds).

<div role="tooltip">...</div>

    Landmarks are prominent sections of content on a page.

    Screen readers like JAWS and NVDA lets you navigate between landmarks with keyboard shortcuts. Voiceover does not have keyboard shortcut, but it has a command.
    Screen reader	Next landmark shortcut
    JAWS	R
    NVDA	D

    There are 8 landmark roles.

        banner
        complementary
        contentinfo
        form
        main
        navigation
        region
        search

    7 of these 8 landmarks are built into HTML.
    Landmark	HTML Element
    Banner	<header> when not used in other landmarks
    Complementary	<aside>
    Contentinfo	<footer> when not used in other landmarks
    Form	<form>
    Main	<main>
    Navigation	<nav>
    Region	<section> when it has an accessible name
    Search	NA
    Explanation of each role

    Banner represents general information that’s placed at the top of the page. It usually includes the logo, company name, and the main navigation. The <header> element has an implicit banner role if it’s not placed in other landmarks.

    <header>...</header>

    Complementary represents supporting information that’s related to the main content. The <aside> element has an implicit complementary role.

    <aside>...</aside>

    Contentinfo is used to identify information at the end of every page. The <footer> element has an implicit contentinfo role if it’s not placed in other landmarks.

    <footer>...</footer>

    Form denotes a form. The <form> element has an implicit form role.

    <form>...</form>

    Main is used to identify the main content of the page. The <main> element has an implicit main role.

    <main>...</main>

    Navigation is used to identify groups of links for navigating through a website or content. The <nav> element has an implicit navigation role.

    <nav>...</nav>

    Region is a generic landmark role. It is used to identify areas that are significant (but don’t fall into other landmark roles). The <section> element has an implicit region role if it is given an accessible name.

    Accessible names are really important. We’ll talk about accessible names in a later lesson.

    <section aria-label="Section title">...</section>

    Search identifies a form that’s used for search. This is the only landmark role that’s not bulit into a HTML element.

    <form role="search">...</form>

    Exposing landmarks

    At the time of writing, NVDA and Voiceover announce (or expose) all landmark elements except for region and form.

    Let’s say you have this HTML.

    <header>Header</header>
    <aside>Aside</aside>
    <footer>Footer</footer>
    <form>Form</form>
    <main>Main</main>
    <nav>Navigation</nav>
    <section>Section</section>
    <form role="search">Search</form>

    Here’s what you’ll hear on a screen reader if you use the “Next Item” command to walk through every element.
    . Your browser doesn't support the HTML video element. Click to watch the video.

    Both NVDA and Voiceover will read form and region roles if you provide them with an accessible name. You can do this with aria-label and aria-labelledby. (More on these properties in accessible names and descriptions).

    Note: Voiceover announces the form role as group in Safari v13.0.3. Also, it also announces region as empty region if there are no HTML tags within the region.

    <form aria-label="login form">Form</form>
    <section aria-label="section">Section</section>

    . Your browser doesn't support the HTML video element. Click to watch the video.

    Scott O’Hara kept an updated blog post about whether screen readers expose landmark roles correctly.
    What you need to know

    You need to know the HTML elements for each landmark role. Here they are again:
    Landmark	HTML Element
    Banner	<header> when not used in other landmarks
    Complementary	<aside>
    Contentinfo	<footer> when not used in other landmarks
    Form	<form>
    Main	<main>
    Navigation	<nav>
    Region	<section> when it has an accessible name

    Live regions are special.

    When something changes on a webpage, a sighted user can see what changed. But a blind user can’t. Live regions exist to tell blind users what has changed. They announce the changes.

    There are five live region roles:

        alert
        status
        log
        marquee
        timer

    Explanation of each role

    Alert contains messages important and time-sensitive messages. One example is error messages. You should not use alert unless the messages are important AND time-sensitive.

    <div role="alert">...</div>

    Status tells the user something has changed. This contains information that’s not important to warrant an alert.

    <div role="status">...</div>

    Log is used for regions where information is added in a meaningful order. It can be used for things like chat logs or game logs. Old information may be removed from logs.

    <div role="log">...</div>

    Marquee is used for non-essential information that changes regularly. An example is a stock ticker.

    <div role="marquee">...</div>

    Timer is used for any kind of timer or clock.

    <div role="timer">...</div>

    You only need to use alert and status to make most components screen-reader accessible. There’s no need for log, marquee, or timer.
    Live-region roles and live-region attributes

    Each live region role is paired with live region attributes. Here are the pairings:
    Role	aria-live	aria-atomic
    alert	assertive	true
    status	polite	true
    log	polite	false
    marquee	off	false
    timer	off	false

    aria-live and aria-atomic are live-region related aria-properties/states. I’m going to call them live-region attributes to make it easier on the ears
    Live-region attributes

    There are four live-region attributes:

        aria-live
        aria-atomic
        aria-relevant
        aria-busy

    You don’t need to use these attributes most of the time. (alert and status roles are enough). But I’ll still explain what each attribute does for the sake of completeness.
    Explanation of live-region attributes

    Aria-live tells screen readers when to mention changes. It can be set to assertive, polite, or off:

        assertive: Announce changes immediately
        polite: Queue changes and announces them when the next opportunity arises
        off: Don’t announce changes

    If you set aria-live to assertive, it’s almost the same as setting role to alert.

    <div aria-live="assertive">...</div>

    Aria-atomic tells screen readers what the nodes it should mention when something changes. It can be true or false.

        true: Announces the entire live region
        false: Announces only the changed node in the live region.

    <div aria-atomic="true">...</div>

    Aria-relevant tells screen readers what kind of changes to mention. It is a space delimited list that can contain these four values:

        additions: Only announce when things are added to the live region
        removals: Only announce when things get removed from the live region
        text: Only announce when text was changed
        all: Announce all changes

    aria-relevant defaults to additions text.

    <div aria-relevant="additions text"></div>

    Aria-busy tells screen readers whether the live region is still being updated. It can be set to true or false.

        true: Screen readers should wait until aria-busy is set to false before announcing changes.

    <div aria-busy="true"></div>

    Example

    In this example, you’ll see Voiceover announce the changes in the <div> with an alert role.

    <div role="alert"></div>

    <form>
      <label for="input"> Text to announce </label>
      <input type="text" id="input" />
      <button>Add text to live region</button>
    </form>

    const form = document.querySelector('form')
    const input = form.querySelector('input')
    const alertRegion = document.querySelector('[role="alert"]')

    form.addEventListener('submit', event => {
      event.preventDefault()
      const text = input.value.trim()
      alertRegion.textContent = text
    })

    . Your browser doesn't support the HTML video element. Click to watch the video.
    What you should know:

    You only need to know two things:

        The alert role
        The status role

    Remember them yet? Good. You can discard the rest.

    That’s it!

        Explanation of each role
        Live-region roles and live-region attributes
        Live-region attributes
        Explanation of live-region attributes
        Example
        What you should know:

        Document structure roles
        Widget roles



            Accessibility
            Widget Roles

        Widget roles
        6m:51s

        Pay attention here. Widgets are important.

        Widgets (by definition) are things a user can interact with. For example, a <button> is a widget. An <input> is also a widget.

        Widgets are grouped into two categories according to the specs:

            Composite roles
            Non-composite roles

        Composite roles are widget containers that contain two or more smaller widgets. Non-composite roles are the smaller widgets. There are 9 composite and 20 non-composite widget roles.

        It makes more sense to group widget roles according to what they do, so I organised these 29 roles into 7 groups:

            Standalone Widgets
            Input widgets
            Trees and Grids
            Listbox
            Combobox
            Tablist
            Menus

        Standalone widgets

        Standalone widgets are small pieces of interactive elements. They’re quite obvious. You’ll know most of them from their names.
        Role	HTML Element
        button	<button>
        link	<a href="...">
        separator	-
        progressbar	-
        scrollbar	-

        Button triggers an action when a user clicks or presses it. The <button> element has an implicit button role.

        <button>This is a button</button>

        Focusable separator is a separator that divides a component into two parts. Users can slide the separator to show more or less of each part. It’s usually used for a before/after image slider.

        <div role="separator" tabindex="0">...</div>

        This gif is from beer slider. Unfortunately, beer slider not accessible

        Link allows users to navigate to an external (or internal) resources. It’s built into an <a> with a href attribute.

        <a href="#"> Link </a>

        Progressbar is an element that tells the progress status for a task.

        <div role="progressbar">...</div>

        Scrollbar is, well, a scrollbar! You’ll only use this if you decide to code a scrollbar yourself.

        <div role="scrollbar">...</div>

        What to know here

            Know buttons.
            Know links
            Know the other roles exist, but don’t need to remember them.

        Input widgets

        Most of these widgets are built into the <input> element.
        Role	Element
        checkbox	<input type="checkbox">
        switch	-
        radio	<input type="radio">
        textbox	<input type="text">
        searchbox	<input type="search">
        slider	<input type="range">
        spinbutton	-

        Checkbox is an input that can be checked by a user. Its value can be true, false, or mixed. The checkbox role is built into <input type="checkbox">

        <input type="checkbox" />

        Switch is a type of checkbox that accepts only on or off values. (It’s like a cross-breed between a checkbox and a button). I don’t see the need to use switch when checkbox and button roles exist.

        <button role="switch">...</button>

        Radio is a checkable input that comes in a group. Only one radio can be checked at any one time. The radio role is built into <input type="radio">.

        Radio elements should be contained inside a radiogroup (You only need radiogroup if you use the radio role).

        <input type="radio" />

        Textbox is an input that allows users to enter text. The textbox role is built into <input type="text"> and <textarea>.

        <input type="text" />

        Searchbox is a textbox that’s meant to help users search for something. The searchbox role is built into <input type="search">.

        <input type="search" />

        Slider is an input that allows users to select a value from a given range. The slider role is built into <input type="range">

        <input type="range" />

        Spinbutton is a type of range input that expects the user to select a value from several discrete choices. It usually comes with an Up/Down/Left/Right buttons.
        Example of a spinbutton.
        Another example of a spinbutton.

        <div role="spinbutton">...</div>

        What to know here

        Be familiar with <input> with these types:

            text
            radio
            checkbox
            search

        Know the rest, but don’t need to remember them.
        Trees and grids

        There are three composite roles in the grids and trees group. They are:

            tree
            grid
            treegrid

        Tree

        Tree is a specific type of list that contains collapsible lists.
        Example of tree by Deque University

        Children elements of a tree can have two roles:

            group
            treeitem

        If the element is an <ul> or <ol>, that element should have a group role. If the element is a <li>, that element should have a treeitem role.

        <ul role="tree">
          <li role="treeitem">
            <span> Name of group </span>
            <ul role="group">
              <li role="treeitem">...</li>
              <li role="treeitem">...</li>
              <li role="treeitem">...</li>
            </ul>
          </li>
        </ul>

        Grid

        Grid contains content that can be grouped into columns and rows. Grids are tables (but they don’t have to look like tables). Grids contain interactive content while tables contain static content.

        Grids can use the following roles:

            row
            rowgroup
            rowheader
            columnheader
            gridcell

        <table role="grid">
          <!-- table        -->
          <thead>
            <!-- rowgroup     -->
            <tr>
              <!-- row          -->
              <th>Column 1</th>
              <!-- columnheader -->
              <th>Column 2</th>
            </tr>
          </thead>
          <tbody>
            <!-- rowgroup     -->
            <tr>
              <!-- row          -->
              <th>Row 1</th>
              <!-- rowheader    -->
              <td>Item</td>
              <!-- cell         -->
            </tr>
          </tbody>
        </table>

        It’s perfectly fine if you don’t want to use the <table> element. However, you still need to make sure:

            gridcell, columnheader, and rowheader are wrapped in row
            row is wrapped in rowgroup or grid

        Treegrid

        Treegrid combines grid and tree. I doubt you’d ever build a component that requires a treegrid role. It looks like this:
        Example of a treegrid
        What to know here

        Know these roles exist. But don’t need to remember them. You can do more research when you need to.
        Listbox

        A listbox let users to select one or more choices from a list. Each listbox item should have the option role. options can contain images.

        The best example of a listbox is the list of predictions in Typeahead.
        Example of a listbox.

        Know the listbox role exist. We won’t dive into Typeahead so we won’t use it (I’ll explain why at the end of this module).
        Combobox

        A combobox has two elements:

            A single-line text field (either <input type="text"> or <input type="search">)
            An element that can be shown or hidden. This element must be one of the following roles:
                listbox
                dialog
                grid
                tree

        An example of a combobox is Typeahead.
        Example of a Combobox.

        Again, know the combobox role exist. We won’t use it. (I’ll also explain why at the end of this module).
        Tablist

        Tablist is a tabbed component. They mean the same thing.
        Example of a Tabslist.

        Tablist contains two kinds of children:

            tab: The tab
            tabpanel: The content of the tab.

        We’ll use tab and tabpanel to improve Tabby.
        Menus

        There are two composite roles in the menus category:

            menu
            menubar

        A menu offers a list of choices to the user. It’s similar to listbox, but it should be presented in a way that’s similar to a <select> element.
        Example of a menu from Heydon pickering's Inclusive Components

        A menubar is a menu that always remains visible. It should work (and feel) the same as a menubar in most desktop applications.
        Example of a menubar: The finder menu on a Mac.

        Menus (and menubar) can have three types of children elements:

            menuitem: A generic item inside a menu
            menuitemcheckbox: A checkbox inside a menu
            menuitemradio: A radio inside a menu

        What to know here

        Know the menu and menubar roles exist. But also understand you should NEVER use them. (Because they put screen readers into application mode).
        Quick summary

        There are lots of widget roles. It can be confusing! I wanted to show you everything so you have a sense of role fits what kind of components.

        Just know these roles exist. You don’t need to remember any of them.

        We’ll go through the important ones as we improve our components together.

        That’s it!

            Standalone widgets
                What to know here
            Input widgets
                What to know here
            Trees and grids
                Tree
                Grid
                Treegrid
                What to know here
            Listbox
            Combobox
                Tablist
                Menus
                What to know here



                There are two more categories of roles:

                    Window roles
                    Abstract roles

                We’ll go through them together in this lesson. It’ll be short, unlike the lessons you just went through.
                Window roles

                There are two window roles:

                    alertdialog
                    dialog


                Alertdialog is a specific type of dialog. You should use alertdialog over dialog if you need users to manually close an important alert message.
                Abstract roles

                Abstract roles are roles used to create other types of aria roles. You will never use any abstract roles.

                That’s it! I said this would be short, didn’t I?

                    Window roles
                    Abstract roles

                    Widget roles
                    Accessible names and descriptions


                    Accessible names and descriptions


                    All interactive elements must have an accessible name. Screen readers will announce this name to readers.

                    If you want to give users more information, you can add an accessible description.
                    Providing an accessible name

                    There are three ways to give an element an accessible name:

                        Using the text content
                        aria-labelledby
                        aria-label

                    Using the text content

                    The text content of an element is an accessible name. If screen reader reads the element, it’ll read the contents, plus the role of the element.

                    For example, if you write “submit” in a <button>, submit is the accessible name.

                    <button>Submit</button>

                    You should use text content to create accessible names whenever possible. If you cannot use text content, you can still use aria-labelledby or aria-label.
                    Using aria-labelledby

                    aria-labelledby lets you use another element as an accessible name. It takes in the id of the target element.

                    Here’s an example. Let’s say you have an <article> element. You can provide screen readers with the article’s name with aria-labelledby.

                    <article aria-labelledby="article-title">
                      <h2 id="article-title">The Story of Goldilocks and the Three Bears</h2>
                    </article>

                    . Your browser doesn't support the HTML video element. Click to watch the video.

                    Note: NVDA doesn’t announce <article>.
                    Using aria-label

                    aria-label is a third way to give elements an accessible name. The accessible name is the value given to aria-label.

                    It should be used when:

                        You can’t use textContent
                        It is difficult to use aria-labelledby

                    When you use aria-label, screen readers will read value in aria-label. They will not read the text content.

                    <button aria-label="Close menu">X</button>

                    . Your browser doesn't support the HTML video element. Click to watch the video.
                    Providing an accessible description

                    Screen reader users may skip around content with keyboard shortcuts. For example, they may Tab into a password field without going through any hints provided to a sighted user.

                    <form>
                      <label for="password">Password</label>
                      <p id="hint">Passwords should have at least one uppercase character.</p>
                      <input type="password" id="password" placeholder="••••••••" />
                    </form>

                    . Your browser doesn't support the HTML video element. Click to watch the video.

                    In this case, the screen reader user won’t know the password needs an uppercase character.

                    You can provide this (important, but easily missed) information with aria-describedby.

                    aria-describedby works like aria-labelledby. You pass in the id of the description into aria-describedby.

                    <form>
                      <label for="password">Password</label>
                      <p id="hint">Passwords should have at least one uppercase character</p>
                      <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        aria-describedby="hint"
                      />
                    </form>

                    . Your browser doesn't support the HTML video element. Click to watch the video.
                    Important note

                    aria-label, aria-labelledby, and aria-describedby can only be used on elements with landmark and widget roles.

                    Screen readers may not speak the accessible name or description if you use them on other roles.

                        Providing an accessible name
                            Using the text content
                            Using aria-labelledby
                            Using aria-label
                        Providing an accessible description
                        Important note

                        Window and Abstract roles
                        Hiding content


                        There are three ways to hide content:

                            Hiding content BOTH visually and from screen readers.
                            Hiding content visually only.
                            Hiding content from screen readers only.

                        Hiding content BOTH visually and from screen readers

                        If you want to hide content completely, you can use any of these methods:

                            Set element to display: none.
                            Set element to visibility: hidden.
                            Use the hidden attribute.

                        Here’s how to choose between them:

                            Use hidden or display: none if you don’t want to animate the element.
                            Use visibility: hidden if you want to animate hidden element.

                        Hiding content visually

                        In theory, you can hide content visually (but not from screen readers) by setting opacity to 0.

                        .element {
                          opacity: 0;
                        }

                        But it’s not so simple in practice. Long story short, the best way to hide content visually is with this bunch of CSS.

                        .sr-only {
                          position: absolute;
                          width: 1px;
                          height: auto;
                          margin: 0;
                          padding: 0;
                          border: 0;
                          clip: rect(0 0 0 0);
                          overflow: hidden;
                          white-space: nowrap;
                        }

                        If you use .sr-only, users will not be able to see the content, but screen readers can still read the content.

                        <p>Visible content.</p>
                        <p class="sr-only">Screen reader only content.</p>

                        . Your browser doesn't support the HTML video element. Click to watch the video.
                        Hiding content from screen readers

                        You can use aria-hidden to hide content from screen readers. You should hide content from screen readers only if it improves their experience.

                        <p>Visible content.</p>
                        <p aria-hidden="true">Visible (but not to screen readers)</p>
                        <p>Visible content.</p>

                        . Your browser doesn't support the HTML video element. Click to watch the video.

                            Hiding content BOTH visually and from screen readers
                            Hiding content visually
                            Hiding content from screen readers

                            Accessible names and descriptions
                            ARIA properties and ARIA states



                            ARIA properties and ARIA states

                            Aria-properties and aria-states are both attributes. The main difference between them are:

                                aria-properties are unlikely to change
                                aria-states are likely to change

                            In practice, we don’t really differentiate between properties or states. We simply see them as attributes.

                            Examples of ARIA attributes you’ve seen are:

                                aria-label
                                aria-labelledby
                                aria-describedby
                                aria-hidden

                            You can find the list of properties and states in the specs. There are 48 properties and states grouped into 5 categories.

                                Global attributes
                                Widget attributes
                                Live region attributes
                                Drag and drop attributes
                                Relationship attributes

                            We won’t go through the list of attributes one by one because you’ll get overwhelmed. We will go through the attributes you need to know right before you use them to build components.
                            ARIA support across screen readers

                            ARIA attributes mentioned in the W3C Spec are not fully supported across screen readers. You should check for support before implementing them.

                            The best resources I could find to check for support are:

                                Aria Support for JAWS: An ARIA support list for JAWS, maintained by accessibility experts.
                                A11y Support: A community-driven ARIA Supports list for all screen readers.

                                ARIA support across screen readers

                                Hiding content
                                ARIA for expandable widgets




                                You need to know three ARIA attributes to build expandable widgets:

                                    aria-expandable
                                    aria-haspopup
                                    aria-controls

                                Aria-expandable

                                aria-expandable is often used on widgets like buttons. It can either be true or false.

                                    true: Controlled element is expanded
                                    false: Controlled element is collapsed

                                <button>Normal button</button>
                                <button aria-expanded="false">Aria expanded false</button>
                                <button aria-expanded="true">Aria expanded true</button>

                                Screen readers will say “expanded” if aria-expanded="true". They will say “collapsed” if aria-expanded="false"
                                . Your browser doesn't support the HTML video element. Click to watch the video.
                                Aria-haspopup

                                aria-haspopup is used to tell users what kind of element will appear when aria-expanded becomes true. It is only used when the expandable section is one of these roles:

                                    menu
                                    listbox
                                    tree
                                    grid
                                    dialog

                                <!-- JavaScript required to show the listbox -->
                                <button aria-expanded="false" aria-haspopup="listbox">Show listbox</button>

                                <ul hidden role="listbox">
                                  ...
                                </ul>

                                Screen reader support for aria-haspopup is poor. JAWS and NVDA only support true (which is used for the menu role).
                                Support for aria-haspopup.

                                In practice, aria-haspopup gives the same amount of information as aria-expanded—something will pop up. There’s no need to use aria-haspopup if you already use aria-expanded. (Unless you want to provide the additional semantics for menu).
                                Aria-controls

                                aria-controls tells screen readers which element is being controlled. It takes in the id of the controlled element. The specs key stating we “must” use aria-controls.

                                <button aria-expanded="false" aria-controls="story">Show story</button>

                                <section hidden id="story">
                                  <h2>Goldlilocks and the three bears</h2>
                                </section>

                                However, Heydon Pickering suggests that aria-controls is poop because it doesn’t have much screen reader support (and it doesn’t do much either).
                                Support for aria-controls.

                                So there’s no need to use aria-controls. (Yes, this goes against the spec, but let’s be practical 😉).

                                    Aria-expandable
                                    Aria-haspopup
                                    Aria-controls



Community

    Learn Javascript
    Accessibility
    Aria Modal Dialogs

ARIA for modal dialogs
0m:46s

A dialog is a popup that prompts a user to respond to some information. There are two kinds of dialogs:

    Modal dialogs
    Non-modal dialogs

Modal means you cannot interact with things outside the dialog when the dialog is open.

If you have a Modal dialog, you need to prevent users from interacting with things outside of the dialog. You can do this with aria-modal.
Aria-modal

aria-modal tells a screen reader whether the element is a modal dialog. It can be true or false.

    true: Element is a modal dialog
    false: Element is not a modal dialog

If a modal with aria-modal="true" is shown, screen readers should only be able to interact with that modal.

Unfortunately, not all screen readers support aria-modal at the moment.
Support for aria-modal.
Emulating aria-modal

We can emulate aria-modal behavior by adding aria-hidden to other elements when the modal is opened.

    Aria-modal
    Emulating aria-modal

    🛠️ Off-canvas: Accessibility


Community

    Learn Javascript
    Accessibility
    Aria For Tabs

ARIA for Tabbed components
0m:45s

You need to know two things to build or Tabbed components.

    Roles for a Tabbed component
    aria-selected

Roles for a Tabbed component

There are three roles for a Tabbed component:

    Tab
    Tablist
    Tabpanel

A tab role tells screen reader users they’re on a tab. Tabs should be placed in an element with a tablist role.

<div role="tabslist">
  <button role="tab">...</button>
  <button role="tab">...</button>
  <button role="tab">...</button>
</div>

When a tab is selected, their respective content must be shown. The content must have a tabpanel role.
Aria-selected

aria-selected indicates whether an element is selected. It can either be true or false.

    true: Element is selected
    false: Element is not selected

aria-selected can only be used in these four roles:

    row
    gridcell
    option
    tab

This means aria-selected can only be used in these three composite roles:

    grid
    listbox
    tablist

    Roles for a Tabbed component
    Aria-selected

    🛠️ Accordion: Screen reader accessibility
    🛠️ Tabby: Screen reader accessibility
