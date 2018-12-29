> To view the live source code, visit https://serene-shirley-c6c225.netlify.com/

Enclosed you will find the source code to a brief coding exercise, written in React & TypeScript. If you are reading this, chances are you already know the context and I need not elaborate. That said, there are a few reflections about this exercise I would like to share:

**To save new projects, type in a project name and press "Enter".**
This does not strike me as the most UX-friendly solution possible, but as the mockups offered no visual solution to saving projects, this approach seemed the most intuitive. In future iterations, I believe a physical save button should be present for accessibility purposes and clarity.

**There are no tests.**
Obviously, in a production environment, tests would have been written for all of the above components. Initially, I started out copying boilerplate test suites for each of the components, but it began resulting in far too many files and felt like overkill for such a small exercise. Just know that, in reality, those tests would have been written.

**Ant Design required some surprising modifications.**
While the mockups were obviously built upon [Ant Design](https://ant.design), I was surprised to discovered the nuances in the mockups were just significant enough that full CSS overrides and extensions needed to be added to reach pixel perfection. For example, while the modal's color, border radius, and drop shadow perfectly matched Ant's `<Modal/>` component, its button spacing, footer border, and icon theme did not. As a result, the modal content component had to be rewritten from scratch to match the spec, while Ant's confirmation modals looked almost exactly the same, with the exception of the few non-configurable styling differences. In a professional environment, I'd recommend consulting with design to see if the UI could better align with the adopted design system to minimize code duplication and forced overrides.

**There are no CSS files.**
This project utilizes [styled components](https://www.styled-components.com/) (CSS-in-JS), as opposed to separate SASS/CSS files, to provide a more declarative API for overriding the styles of Ant Design. Styled components allow us to extend Ant Design's React components directly and apply styles to them, all the while utilizing React's component markup.

So instead of:

```jsx
<List className="projects__list">
```

we can simply use:

```jsx
<ProjectsList />
```

This allows us to keep our markup and our files clean. We can also modify styles based on props automatically as opposed to unnecessary conditionals. My mind jumped to styled components when it occurred to me Ant Design would need to be heavily modified / extended. I thought it would be the most straightforward, clear way to extend and adjust its styles. It also allows us to modularize customized Ant components with ease.
