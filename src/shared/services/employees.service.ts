import type {Employee} from "../models/employee.model.ts";

export async function getAll(): Promise<Employee[]> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
}