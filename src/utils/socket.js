// import io from 'socket.io-client';
// import { BASE_URL } from './constants';

// export const  createSocketConnection = () => {
//     if(location.hostname === "localhost") return io(BASE_URL);
//     else return io("/",{path:"/api/socket.io"});
// };
// export default createSocketConnection;


import { io } from 'socket.io-client';
import { BASE_URL } from './constants';

export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
        // Local development
        return io(BASE_URL, {
            withCredentials: true
        });
    } else {
        // Production: Point directly to Render, NOT "/"
        return io("https://devtinder-c1y5.onrender.com", {
            withCredentials: true
        });
    }
};

export default createSocketConnection;