import type { Mapping } from "../types/Mapping";

const API_URL = "http://localhost:5272/api/Mapping/";

export async function getMappings(): Promise<Mapping[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch mappings");
    }
    return response.json();
}