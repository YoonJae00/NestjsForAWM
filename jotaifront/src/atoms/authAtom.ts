import { atom } from "jotai";
import axios from "axios";

interface LoginResponse {
    accessToken? : string;
}

interface LoginRequest {
    userId: string;
    userPassword: string;
}

export const authAtom = atom<LoginResponse| null>(null);

export const loginAtom = atom(
    (get) => get(authAtom),
    async (get, set, payload: LoginRequest) => {
        await axios.post<LoginResponse>('http://localhost:3000/auth/login', payload)
            .then((res) => {
                set(authAtom, res.data);
            })
            .catch((error) => {
                set(authAtom, error.response.data.message);
            })
    }
)