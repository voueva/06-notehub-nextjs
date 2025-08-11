import axios from "axios";
import type { Note } from "../app/types/note";

export interface NoteListParams  {
    page: number;
    perPage: number;
    search?: string;
}
export interface NoteListResponse {
    notes: Array<Note>;
    totalPages: number;
}

const API_URL = 'https://notehub-public.goit.study/api/notes';

const perPage = 10;

export const fetchNotes = async (search: string, page: number): Promise<NoteListResponse> => {
    let params: NoteListParams = {
        page,
        perPage
    };

    if (search) {
        params = {
            ...params,
            search
        };
    }

    try {
        const response = await axios.get<NoteListResponse>(API_URL, {
            params,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
                accept: 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const createNote = async (
    title: string,
    content: string,
    tag: string
): Promise<Note> => {
    try {
        const response = await axios.post<Note>(API_URL, {
            title,
            content,
            tag
        }, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
                accept: 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const deleteNote = async (id: string): Promise<Note> => {
    try {
        const response = await axios.delete<Note>(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
                accept: 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getSingleNote = async (id: string) => {
    try {
        const response = await axios.get<Note>(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
                accept: 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  };
