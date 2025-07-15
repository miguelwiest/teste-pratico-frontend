import {getAll} from '../employees.service.ts';
import axios from 'axios';
import type {Employee} from "../../models/employee.model.ts";

jest.mock('axios');

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
});

describe('getAll', () => {

    beforeEach(() => {
        consoleErrorSpy.mockClear();
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    it('returns employees when API call is successful', async () => {
        const mockData = [{id: 1, name: 'John Doe'}];
        (axios.get as jest.Mock).mockResolvedValue({data: mockData});

        const result = await getAll({pageParam: 1, searchTerm: ''});

        expect(result).toEqual(mockData);
    });

    it('returns an empty array when API call fails', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

        const result = await getAll({pageParam: 1, searchTerm: ''});

        expect(result).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching employees:', expect.any(Error));
    });

    it('constructs the correct URL with default parameters', async () => {
        const mockData: Employee[] = [];
        (axios.get as jest.Mock).mockResolvedValue({data: mockData});

        await getAll({pageParam: 1, searchTerm: ''});

        expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/employees?_page=1&_limit=10`);
    });

    it('constructs the correct URL with a search term', async () => {
        const mockData: Employee[] = [];
        (axios.get as jest.Mock).mockResolvedValue({data: mockData});

        await getAll({pageParam: 1, searchTerm: 'Jane'});

        expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/employees?_page=1&_limit=10&q=Jane`);
    });

    it('encodes special characters in the search term', async () => {
        const mockData: Employee[] = [];
        (axios.get as jest.Mock).mockResolvedValue({data: mockData});

        await getAll({pageParam: 1, searchTerm: 'John Doe & Co'});

        expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE_URL}/employees?_page=1&_limit=10&q=John%20Doe%20%26%20Co`);
    });
});