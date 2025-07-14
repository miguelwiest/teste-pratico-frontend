import React from 'react';
import searchIcon from '../../../assets/icons/search.svg';
import * as S from './style.ts';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    icon?: boolean;
    iconPosition?: 'left' | 'right';
    width?: string | number;
    maxWidth?: string;
}

export const Input: React.FC<InputProps> = ({placeholder, icon, iconPosition = 'right', width, ...props}) => {
    return (
        <S.ComponentWrapper
            width={typeof width === 'number' ? `${width}px` : width}
            maxWidth={props.maxWidth}
        >
            <S.InputContainer>
                {icon && <S.IconWrapper iconPosition={iconPosition}>
                    <img src={searchIcon} alt="search_icon"/>
                </S.IconWrapper>
                }
                <S.StyledInput placeholder={placeholder} hasIcon={!!icon} iconPosition={iconPosition} {...props} />
            </S.InputContainer>
        </S.ComponentWrapper>
    );
};