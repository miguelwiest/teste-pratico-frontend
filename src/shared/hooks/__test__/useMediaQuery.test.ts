import {renderHook, act} from '@testing-library/react';
import {useMediaQuery} from '../useMediaQuery'; // Ajuste o caminho conforme necessário

const originalMatchMedia = window.matchMedia;

const setupMatchMediaMock = () => {
    const listeners: ((event: { matches: boolean }) => void)[] = [];

    const mediaQueryListMock = {
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, listener) => {
            if (event === 'change') {
                listeners.push(listener);
            }
        }),
        removeEventListener: jest.fn((event, listener) => {
            if (event === 'change') {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        }),
        dispatchEvent: jest.fn(),
    };

    window.matchMedia = jest.fn().mockImplementation(query => {
        mediaQueryListMock.media = query;
        return mediaQueryListMock;
    });

    return {
        mediaQueryListMock,
        simulateChange: (matches: boolean) => {
            mediaQueryListMock.matches = matches;
            listeners.forEach(listener => listener({ matches }));
        },
        setInitialValue: (matches: boolean) => {
            mediaQueryListMock.matches = matches;
        }
    };
};

describe('Hook useMediaQuery', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        window.matchMedia = originalMatchMedia;
    });

    it('deve retornar true se a media query corresponder inicialmente', () => {
        const { setInitialValue } = setupMatchMediaMock();
        setInitialValue(true);

        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(true);
    });

    it('deve retornar false se a media query não corresponder inicialmente', () => {
        const { setInitialValue } = setupMatchMediaMock();
        setInitialValue(false);

        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(false);
    });

    it('deve atualizar o valor quando o status da media query mudar', () => {
        const { simulateChange, setInitialValue } = setupMatchMediaMock();
        setInitialValue(false);
        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(false);

        act(() => {
            simulateChange(true);
        });

        expect(result.current).toBe(true);
    });

    it('deve adicionar e remover o event listener corretamente', () => {
        const { mediaQueryListMock, setInitialValue } = setupMatchMediaMock();
        setInitialValue(true);

        const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(mediaQueryListMock.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        expect(mediaQueryListMock.addEventListener).toHaveBeenCalledTimes(1);

        unmount();

        expect(mediaQueryListMock.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        expect(mediaQueryListMock.removeEventListener).toHaveBeenCalledTimes(1);
    });
});