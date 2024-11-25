import type {MoveSelectiontoEnd, ScrollToBottom} from './types';

const scrollToBottom: ScrollToBottom = (input) => {
    if (!('scrollTop' in input)) {
        return;
    }
    // eslint-disable-next-line no-param-reassign
    input.scrollTop = input.scrollHeight;
};

const scrollToRight: ScrollToBottom = (input) => {
    if (!('scrollLeft' in input)) {
        return;
    }
    // Scroll to the far right
    // eslint-disable-next-line no-param-reassign
    input.scrollLeft = input.scrollWidth;
};

const moveSelectionToEnd: MoveSelectiontoEnd = (input) => {
    if (!('setSelectionRange' in input)) {
        return;
    }
    const length = input.value.length;
    input.setSelectionRange(length, length);
};

export {scrollToBottom, moveSelectionToEnd, scrollToRight};
