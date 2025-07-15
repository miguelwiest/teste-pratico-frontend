import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('Hook useDebounce', () => {
    it('deve retornar o valor inicial na primeira renderização', () => {
        const { result } = renderHook(() => useDebounce('valor inicial', 500));

        expect(result.current).toBe('valor inicial');
    });

    it('não deve atualizar o valor imediatamente quando o valor de entrada muda', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'valor inicial', delay: 500 } }
        );

        act(() => {
            rerender({ value: 'novo valor', delay: 500 });
        });

        expect(result.current).toBe('valor inicial');
    });

    it('deve atualizar o valor após o delay especificado', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'valor inicial', delay: 500 } }
        );

        act(() => {
            rerender({ value: 'novo valor', delay: 500 });
        });

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe('novo valor');
    });

    it('deve resetar o delay se o valor mudar novamente', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'a', delay: 500 } }
        );

        act(() => {
            rerender({ value: 'ab', delay: 500 });
        });

        act(() => {
            jest.advanceTimersByTime(300);
        });
        expect(result.current).toBe('a');

        act(() => {
            rerender({ value: 'abc', delay: 500 });
        });
        expect(result.current).toBe('a');

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe('abc');
    });
});