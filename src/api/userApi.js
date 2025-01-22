import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class UserApi {
    userApi = axios.create({
        baseURL: API_BASE_URL + '/users',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    async registerUser(userData) {
        const res = await this.userApi.post('/register', userData);
        return res.data;
    }

    async loginUser(credentials) {
        const res = await this.userApi.post('/login', credentials);
        localStorage.setItem('userEmail', res.data.user.email);
        return res.data;
    }

    async logoutUser() {
        const res = await this.userApi.post('/logout', true);
        return res.data;
    }
    
    async getUserDetails(email) {
        try {
            email = email.userEmail;
            const res = await this.userApi.get(`/details?email=${email}`);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
    
    async getUserDetailsFromId(userId) {
        try {
            const res = await this.userApi.get(`/details/id?userId=${userId}`);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, updateData) {
        try {
            const res = await this.userApi.put(`/update/${userId}`, updateData);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}

const UserApiInstance = new UserApi();
export default UserApiInstance;
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// class UserApi {
//     userApi = axios.create({
//         baseURL: API_BASE_URL + '/users',
//         withCredentials: true,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     async registerUser(userData) {
//         try {
//             const res = await this.userApi.post('/register', userData);
//             return res.data;
//         } catch (error) {
//             // Handle specific error statuses if needed
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.error("Error data:", error.response.data);
//                 console.error("Error status:", error.response.status);
//                 console.error("Error headers:", error.response.headers);
//                 throw new Error(`Registration failed: ${error.response.data.message}`);
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error("Error request:", error.request);
//                 throw new Error('No response from server');
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.error('Error', error.message);
//                 throw new Error('Error setting up registration request');
//             }
//         }
//     }
    

//     async loginUser(credentials) {
//         const res = await this.userApi.post('/login', credentials);
//         localStorage.setItem('userEmail', res.data.user.email);
//         return res.data;
//     }

//     async logoutUser() {
//         const res = await this.userApi.post('/logout', true);
//         return res.data;
//     }
    
//     async getUserDetails(email) {
//         try {
//             email = email.userEmail;
//             const res = await this.userApi.get(`/details?email=${email}`);
//             return res.data;
//         } catch (error) {
//             throw error;
//         }
//     }
    
//     async getUserDetailsFromId(userId) {
//         try {
//             const res = await this.userApi.get(`/details/id?userId=${userId}`);
//             return res.data;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async updateUser(userId, updateData) {
//         try {
//             const res = await this.userApi.put(`/update/${userId}`, updateData);
//             return res.data;
//         } catch (error) {
//             throw error;
//         }
//     }
// }

// const UserApiInstance = new UserApi();
// export default UserApiInstance;