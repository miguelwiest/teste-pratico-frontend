import type {Employee} from "../models/employee.model.ts";
import axios from "axios";

export async function getAll({pageParam = 1, searchTerm = ''}): Promise<Employee[]> {
    const LIMIT = 10;
    try {

        let url = `${import.meta.env.VITE_API_BASE_URL}/employees?_page=${pageParam}&_limit=${LIMIT}`;

        if (searchTerm) {
            url += `&q=${encodeURIComponent(searchTerm)}`;
        }

        const response = await axios.get(url);

        return await response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
}