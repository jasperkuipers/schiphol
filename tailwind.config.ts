import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                md: '0 .25rem .75rem rgba(20, 18, 81,.2)',
            },
            colors: {
                current: 'currentColor',
                transparent: 'transparent',

                primary: {
                    DEFAULT: 'var(--schiphol-blue)',
                },
                secondary: {
                    DEFAULT: 'var(--afternoon-blue)',
                },
                tertiary: {
                    DEFAULT: 'var(--seebuyfly-yellow)',
                },
                black: 'var(--black)',
                white: 'var(--white)',
                gray: {
                    50: 'var(--grey-few)',
                    100: 'var(--grey-scattered)',
                    200: 'var(--grey-broken)',
                    300: 'var(--grey-overcast)',
                    400: 'var(--grey-storm)',
                },
                success: {
                    DEFAULT: 'var(--green)',
                },
                error: {
                    DEFAULT: 'var(--dark-red)',
                },
            },
            screens: {
                xxs: '480px',
                xs: '576px',
                sm: '768px',
                md: '992px',
                lg: '1200px',
            },
        },
    },
    plugins: [],
    variants: {
        extend: {
            appearance: ['textfield'],
        },
    },
};

export default config;
