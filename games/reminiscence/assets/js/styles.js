import { css } from 'https://esm.sh/lit@3.2.0';

export const buttonStyle = css`
button {
    font-family: inherit;
    background-color: var(--button-bg);
    border: none;
    transition: var(--transition-time-common);
    color: var(--text-color);

    &:is(:hover, :focus){
        background-color: var(--button-bg-focus);
    }

    &.btn-primary {
        min-width: 8rem;
        min-height: 2rem;
        transition: var(--transition-time-common);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.2rem;
        background-color: var(--theme-color-500);

        &:is(:hover, :focus){
            background-color: var(--theme-color-400);
            color: var(--text-color-contrast);
        }
    }

    &.btn-regular {
        min-width: 8rem;
        min-height: 2rem;
        transition: var(--transition-time-common);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.2rem;
    }

    &:disabled {
        cursor: not-allowed;
        background-color: var(--button-bg-disabled);
        color: var(--text-color-lt);
    }

    &:disabled:is(:hover, :focus){
        background-color: var(--button-bg-disabled);
    }
}
`