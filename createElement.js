// Rendering an App with React:

const element = (
    <div id="section">
        <a>Link</a>
        <br />
    </div>
);
const container = document.getElementById('root');
ReactDOM.render(element,  container);

// The element is JSX so babel would transpile this to js as:

const element = React.createElement(
    "div",
    { id: "section" },
    React.createElement("a", null, "Link"),
    React.createElement("br")
)

// A React element is an object with "type" and "props".
// So we could write an equivalent of createElement func as:

const createElementV1 = (type, props, ...children) => ({
    type, 
    props: {
        ...props, 
        children
    }
});

// The above uses the rest operator to always make children an array
// Even if no 3rd argument is passed into the function, e.g.:

createElement('li');

// returns:
// {
//     type: "li",
//     props: { children: [] }
// }

// Children is usually an array of elements, hence elements are also trees.

// To make createElement accomodate primitives as children 
// (i.e. a String instead of a node)

const createElement = (type, props, ...children) => ({
    type, 
    props: {
        ...props, 
        children: children.map(child => 
            typeof child === "object"
                ? child 
                : createTextElement(child)
        )
    }
});

// This means that everything that isn't an object (i.e. an element)
// Is wrapped inside it's own element and given a special type:

const createTextElement = text => ({
    type: "TEXT_ELEMENT",
    props: {
        nodeValue: text,
        children: []
    }
})

// In order to get babel to use our version, name the library:

const HomeMadeReact = {
    createElement
};

const elements = HomeMadeReact.createElement(
    "div",
    { id: "info" },
    HomeMadeReact.createElement("a", null, "This is information"),
    HomeMadeReact.createElement("b")
);
const container = document.getElementById('root');
ReactDOM.render(elements, container);

// To go one step further an use JSX with our function being used in babel:

/** @jsx HomeMadeReact.createElement */
const elements = (
    <div id="info">
        <a>This is information</a>
        <b />
    </div>
);
const container = document.getElementById('root');
ReactDOM.render(elements, container);

// NOTE:
// React doesn’t wrap primitive values or create empty arrays when 
// there aren’t children. This is done here for simplicity and 
// React cares more about performance than simplicity
