import type {Employee} from "../models/employee.model.ts";
// Library Methods
import axios from "axios";

// Utils
import {processSearchTerm} from "../../shared/utils";

export async function getAll({pageParam = 1, searchTerm = ''}): Promise<Employee[]> {
    const LIMIT = 10;
    try {
        const processedSearchTerm = processSearchTerm(searchTerm);

        let url = `${import.meta.env.VITE_API_BASE_URL}/employees?_page=${pageParam}&_limit=${LIMIT}`;

        if (processedSearchTerm) {
            url += `&q=${encodeURIComponent(processedSearchTerm)}`;
        }

        const response = await axios.get(url);

        return await response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
}