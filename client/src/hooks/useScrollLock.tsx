import { useCallback } from 'react';
export const useScrollLock = () => {
    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '1vw';

    }, [])

    const unlockScroll = useCallback(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''
    }, []);

    return {
        lockScroll,
        unlockScroll
    };
}