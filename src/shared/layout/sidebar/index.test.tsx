import {render, screen} from '@testing-library/react';
import {MemoryRouter, Routes, Route} from 'react-router';
import {Sidebar} from './index.tsx';

interface MockCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    $borderRadius?: string | number;
    $padding?: string | number;
}

jest.mock('../../styles/global.ts', () => ({
    Card: ({children, $borderRadius, $padding, ...restProps}: MockCardProps) => (
        <div {...restProps} style={{
            borderRadius: $borderRadius || '0',
            padding: $padding || '0',
        }}>{children}</div>
    ),
}));

jest.mock('../../../assets/Logo.svg', () => 'test-file-stub');


describe('Componente Sidebar', () => {

    it('deve renderizar a imagem do logo com o texto alternativo correto', () => {
        render(
            <MemoryRouter>
                <Sidebar/>
            </MemoryRouter>
        );

        const logoImage = screen.getByAltText('logo__icon');

        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', 'test-file-stub');
    });

    it('deve renderizar o componente da rota filha através do Outlet', () => {
        const PaginaFilha = () => <div>Conteúdo da Página Filha</div>;

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Sidebar/>}>
                        <Route index element={<PaginaFilha/>}/>
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Conteúdo da Página Filha')).toBeInTheDocument();
    });
});