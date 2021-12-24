export function containsNode(parent, child) {
    return parent === child || (parent.contains && parent.contains(child));
}

export function createElement(tagName, attributes = {}) {
    let $el = document.createElement(tagName);

    Object.keys(attributes).forEach(name => {
        if (name === 'className') {
            $el.classList.add(attributes[name]);
        } else {
            $el.setAttribute(name, attributes[name]);
        }
    });

    return $el;
}

export const browser = typeof window !== 'undefined' && window.document && window.document.createElement;
