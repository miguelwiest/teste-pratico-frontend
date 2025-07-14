import type {DefaultTheme} from 'styled-components'

export const defaultTheme: DefaultTheme = {
    colors: {
        black: '#1C1C1C',
        white: '#FFFFFF',
        gray: {
            20: '#9E9E9E',
            10: '#DFDFDF',
            5: '#F5F5F5',
            0: '#F0F0F0',
        },
        blue: {
            primary: '#0500FF',
            10: '#EDEFFB',
        }
    },
    fonts: {
        family: {
            primary: "'Helvetica Neue', sans-serif",
        },
        sizes: {
            heading: {
                1: '20px',
                2: '16px',
            }
        }
    },
    shadows: {
        primary: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        secondary: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    },
    spacing: {
        medium: {
            80: '80px',
            60: '60px',
            40: '40px',
            32: '32px',
        },
        regular: {
            28: '28px',
            20: '20px',
            16: '16px',
        },
        little: {
            8: '8px',
            4: '4px',
        }
    }
}