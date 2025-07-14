import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            black: string;
            white: string;
            gray: {
                20: string;
                10: string;
                5: string;
                0: string;
            };
            blue: {
                primary: string;
                10: string;
            };
        };
        fonts: {
            family: {
                primary: string;
            };
            sizes: {
                heading: {
                    1: string;
                    2: string;
                }
            };
        };
        spacing: {
            medium: {
                80: string;
                60: string;
                40: string;
                32: string;
            }
            regular: {
                28: string;
                20: string;
                16: string;
            }
            little: {
                8: string;
                4: string;
            }
        };
        shadows: {
            primary: string;
            secondary: string;
        }
    }
}