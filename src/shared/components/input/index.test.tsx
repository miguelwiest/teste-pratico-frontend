import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Input} from './index';

jest.mock('../../../assets/icons/search.svg', () => 'search-icon-stub');

describe('Componente Input', () => {

    it('deve renderizar o input com o placeholder correto', () => {
        render(<Input placeholder="Buscar..." icon iconPosition={'left'}/>);

        const inputElement = screen.getByPlaceholderText('Buscar...');

        expect(inputElement).toBeInTheDocument();
    });

    it('não deve renderizar o ícone se a prop "icon" não for fornecida', () => {
        render(<Input/>);

        const iconImage = screen.queryByAltText('search_icon');

        expect(iconImage).not.toBeInTheDocument();
    });

    it('deve renderizar o ícone quando a prop "icon" for true', () => {
        render(<Input icon/>);

        const iconImage = screen.getByAltText('search_icon');

        expect(iconImage).toBeInTheDocument();
        expect(iconImage).toHaveAttribute('src', 'search-icon-stub');
    });

    it('deve chamar a função onChange quando o usuário digitar no input', async () => {
        const handleChange = jest.fn();
        render(<Input placeholder="Digite aqui" onChange={handleChange}/>);
        const inputElement = screen.getByPlaceholderText('Digite aqui');

        await userEvent.type(inputElement, 'teste');

        expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it('deve estar desabilitado quando a prop "disabled" for true', () => {
        render(<Input placeholder="Desabilitado" disabled/>);

        const inputElement = screen.getByPlaceholderText('Desabilitado');

        expect(inputElement).toBeDisabled();
    });
});
