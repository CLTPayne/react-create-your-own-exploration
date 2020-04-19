// Rendering an App with React:

const element = <h1 title="name">Hello world</h1>;
const container = document.getElementById('root');
ReactDOM.render(element,  container);

// The equivalent in vanilla js:

const element = {
    type: 'h1',
    props: {
        title: "name",
        children: "Hello world"
    }
};

const container = document.getElementById('root');

const node = document.createElement(element.type);
node["title"] = element.props.title;
const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

node.appendChild(text);
document.appendChild(node);