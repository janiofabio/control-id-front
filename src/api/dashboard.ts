import axios from 'axios';
import { API_BASE_URL } from './constants';

const fetchDashboardData = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/dashboard-data`);
    return data;
};
