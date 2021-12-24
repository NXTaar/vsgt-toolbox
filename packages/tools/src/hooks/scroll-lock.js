import { useEffect, useRef, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { containsNode } from '..';

export const useScrollLock = (target, enabled = true, recalculateIgnore = 0) => {
    const allowedScroll = useRef([]);

    const elementsCache = useRef(new Map());

    const allowTouchMove = useCallback(el => {
        if (allowedScroll.current.length === 0) return;

        if (elementsCache.current.has(el)) return elementsCache.current.get(el);

        return allowedScroll.current.some(scr => {
            const result = containsNode(scr, el);

            elementsCache.current.set(el, result);

            return result;
        });
    }, []);

    useEffect(() => {
        allowedScroll.current = Array.from(target.current?.querySelectorAll('[data-scroll-lock-ignore]') || []);
    }, [target.current, recalculateIgnore]);

    useEffect(() => {
        const node = target.current;

        enabled && node && disableBodyScroll(node, { allowTouchMove });

        return () => {
            node && enableBodyScroll(node);
        };
    }, [target.current, enabled]);
};
