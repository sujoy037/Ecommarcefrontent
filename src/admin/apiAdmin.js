import axios from 'axios';
import API_URL from '../config';

export const createCategory = async (userId, token, category) => {
    try {
        const response = await axios.post(
            `${API_URL}/category/create/${userId}`,
            category,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (err) {
        console.error('Error creating category:', err.response ? err.response.data : err.message);
        throw err; 
    }
};