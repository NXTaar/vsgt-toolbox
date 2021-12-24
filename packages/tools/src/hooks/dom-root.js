import { useEffect, useState } from 'react';

import { browser, createElement } from '../utils/dom';

const defaultContainer = browser ? { current: document.body } : { current: null };

const useDOMRoot = ({ anchor, style, container = defaultContainer }) => {
    const [root, setRoot] = useState(null);

    useEffect(() => {
        if (!container.current) return;

        let launchpad = container.current.querySelector(`:scope > [data-${anchor}]`);

        if (!launchpad) {
            launchpad = createElement('div', { className: style, [`data-${anchor}`]: '' });

            container.current.append(launchpad);
        }

        setRoot(launchpad);
    }, [container, anchor, style]);

    return root;
};

export default useDOMRoot;
