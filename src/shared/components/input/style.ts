import styled from "styled-components";

export const ComponentWrapper = styled.div<{
    width?: string;
    maxWidth?: string;
}>`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: ${({width}) => width || '100%'};
    max-width: ${({maxWidth}) => maxWidth || '100%'};
`;

export const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
`;

export const IconWrapper = styled.span<{ iconPosition?: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({iconPosition}) => (iconPosition === 'left' ? '16px' : 'auto')};
    right: ${({iconPosition}) => (iconPosition === 'right' ? '16px' : 'auto')};
    display: flex;
    align-items: center;
    color: #888;
    pointer-events: none;
`;

export const StyledInput = styled.input<{ hasIcon: boolean; iconPosition?: 'left' | 'right' }>`
    padding: 16px 20px;
    padding-left: ${({hasIcon, iconPosition}) => hasIcon && iconPosition === 'left' ? '48px' : '16px'};
    padding-right: ${({hasIcon, iconPosition}) => hasIcon && iconPosition === 'right' ? '48px' : '16px'};

    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    width: 100%;
    box-sizing: border-box;

    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }

    &:disabled {
        background-color: #f4f4f4;
        cursor: not-allowed;
    }
`;