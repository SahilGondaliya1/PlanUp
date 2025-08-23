const API_URL = 'http://localhost:4000';

export const api = {
    async getTask() {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    },
    async createTask(task) {
        const response = await axios.post(`${API_URL}/tasks`,task);
        return response.data;
    },
    async updateTask(task) {
        const response = await axios.put(`${API_URL}/tasks/${task.id}`,task);
        return response.data;
    },
    async deleteTask(taskId) {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
        return response.data;
    }
};