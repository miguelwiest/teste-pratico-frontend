import {render, screen, fireEvent} from '@testing-library/react';
import InfiniteScroll from './index';

describe('Componente InfiniteScroll', () => {
    const defaultProps = {
        next: jest.fn(),
        hasMore: true,
        loader: <div>Carregando...</div>,
        isLoading: false,
        children: <div>Conteúdo</div>,
    };

    beforeEach(() => {
        (defaultProps.next as jest.Mock).mockClear();
    });

    it('deve renderizar os filhos (children)', () => {
        render(<InfiniteScroll {...defaultProps} />);
        expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    });

    it('não deve renderizar o loader se isLoading for false', () => {
        render(<InfiniteScroll {...defaultProps} isLoading={false}/>);
        expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    });

    it('deve renderizar o loader se isLoading for true', () => {
        render(<InfiniteScroll {...defaultProps} isLoading={true}/>);
        expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('deve chamar a função next quando o usuário rolar até o final da página', () => {
        render(<InfiniteScroll {...defaultProps} />);

        Object.defineProperty(document.documentElement, 'scrollHeight', {value: 2000});
        Object.defineProperty(document.documentElement, 'clientHeight', {value: 1000});
        Object.defineProperty(document.documentElement, 'scrollTop', {value: 1000, writable: true});

        fireEvent.scroll(window);

        expect(defaultProps.next).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar a função next se hasMore for false', () => {
        render(<InfiniteScroll {...defaultProps} hasMore={false}/>);

        Object.defineProperty(document.documentElement, 'scrollHeight', {value: 2000});
        Object.defineProperty(document.documentElement, 'clientHeight', {value: 1000});
        Object.defineProperty(document.documentElement, 'scrollTop', {value: 1000, writable: true});

        fireEvent.scroll(window);

        expect(defaultProps.next).not.toHaveBeenCalled();
    });

    it('deve chamar a função next quando o usuário rolar até o final de um elemento específico', () => {
        render(
            <div data-testid="scroll-container" id="scrollableDiv" style={{height: '200px', overflow: 'auto'}}>
                <InfiniteScroll {...defaultProps} scrollableTarget="scrollableDiv">
                    <div style={{height: '800px'}}>Conteúdo Alto</div>
                </InfiniteScroll>
            </div>
        );

        const scrollContainer = screen.getByTestId('scroll-container');

        Object.defineProperty(scrollContainer, 'scrollHeight', {value: 800});
        Object.defineProperty(scrollContainer, 'clientHeight', {value: 200});
        Object.defineProperty(scrollContainer, 'scrollTop', {value: 600, writable: true});

        fireEvent.scroll(scrollContainer);

        expect(defaultProps.next).toHaveBeenCalledTimes(1);
    });
});
