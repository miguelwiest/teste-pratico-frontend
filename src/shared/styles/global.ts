import styled, {createGlobalStyle} from 'styled-components';
import helvetica from './fonts/helvetica/Helvetica.ttf';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Helvetica Neue';
        src: url(${helvetica}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({theme}) => theme.colors.gray["0"]};
        color: ${({theme}) => theme.colors.black};
        font-family: ${({theme}) => theme.fonts.family.primary};
    }

    .mobile-only {
        display: block;
    }

    .desktop-only {
        display: none;
    }

    @media (min-width: 769px) {
        .mobile-only {
            display: none;
        }

        .desktop-only {
            display: contents;
        }
    }
`;

export const Card = styled.div<{
    $padding?: string | number;
    $margin?: string | number;
    $backgroundColor?: string;
    $borderRadius?: string | number;
    $boxShadow?: string;
    $width?: string | number;
    $height?: string | number;
    $display?: string;
    $flexDirection?: string;
    $alignItems?: string;
    $justifyContent?: string;
    $gap?: string | number;
    $position?: string;
    $top?: string | number;
    $left?: string | number;
    $right?: string | number;
    $bottom?: string | number;
    $zIndex?: number;
}>`
    padding: ${({$padding}) => $padding || '16px'};
    margin: ${({$margin}) => $margin || '0'};
    background-color: ${({$backgroundColor, theme}) => $backgroundColor || theme.colors.white};
    border-radius: ${({$borderRadius}) => $borderRadius || '8px'};
    box-shadow: ${({$boxShadow, theme}) => $boxShadow || theme.shadows.primary};
    width: ${({$width}) => $width || '100%'};
    height: ${({$height}) => $height || 'auto'};
    display: ${({$display}) => $display || 'flex'};
    flex-direction: ${({$flexDirection}) => $flexDirection || 'column'};
    align-items: ${({$alignItems}) => $alignItems || 'stretch'};
    justify-content: ${({$justifyContent}) => $justifyContent || 'flex-start'};
    gap: ${({$gap}) => $gap || '0'};
    position: ${({$position}) => $position || 'relative'};
    top: ${({$top}) => $top || 'auto'};
    left: ${({$left}) => $left || 'auto'};
    right: ${({$right}) => $right || 'auto'};
    bottom: ${({$bottom}) => $bottom || 'auto'};
    z-index: ${({$zIndex}) => $zIndex || 1};
`;

export const Container = styled.div<{
    $padding?: string | number;
    $margin?: string | number;
    $width?: string | number;
    $height?: string | number;
    $backgroundColor?: string;
}>`
    padding: ${({$padding}) => $padding || '16px'};
    margin: ${({$margin}) => $margin || '0'};
    width: ${({$width}) => $width || '100%'};
    height: ${({$height}) => $height || '100%'};
    background-color: ${({$backgroundColor, theme}) => $backgroundColor || theme.colors.gray["0"]};
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`;