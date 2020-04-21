// Currently focusing on the adding to the DOM functionality of render:
const render = (element, container) => {
    // Create an element using the type property in the element object
    const dom = element.type === "TEXT_ELEMENT" 
        ? document.createTextNode("") 
        : document.createElement(element.type);
    
    // Assign the props per node
    const isProperty = key => key !== "children"
    Object.keys(element.props).filter(isProperty).forEach(name => dom[name] = element.props[name])
    
    // Recursively made dom nodes for every child of the element
    // The dom created from your previous element is the container for the next one
    element.props.children.forEach(child => render(child, dom))

    container.appendChild(dom);
};

const HomeMadeReact = {
    render,
    createElement
};

/** @jsx HomeMadeReact.createElement */
const element = (
    <div id="section">
        <a>My element</a>
        <b />
    </div>
)

HomeMadeReact.render(element, container);