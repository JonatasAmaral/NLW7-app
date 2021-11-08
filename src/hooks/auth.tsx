import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSessions from "expo-auth-session";

import env from "../../.env";
import { api } from "../services/api";

const CLIENT_ID = env.GITHUB_CLIENT_ID;
const SCOPE = "read:user";
const USER_STORAGE = "@nlw7-app:user";
const TOKEN_STORAGE = "@nlw7-app:token";

type User = {
	id: string;
	avatar_url: string;
	name: string;
	login: string;
};

type AuthContextData = {
	user: User | null;
	isSigningIn: boolean;
	signIn(): Promise<void>;
	signOut(): void;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

type AuthResponse = {
	token: string;
	user: User;
};

type AuthorizationResponse = {
	params: {
		code?: string;
		error?: string;
	};
	type?: string;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

	// TODO: corrigir na versão web. Nova janela não redireciona para github
	async function signIn() {
		setIsSigningIn(true);
		try {
			const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
			const authSessionResponse = (await AuthSessions.startAsync({
				authUrl,
			})) as AuthorizationResponse;

			if (
				authSessionResponse.type === "success" &&
				authSessionResponse.params.error !== "access_denied"
			) {
				const authResponse = await api.post<AuthResponse>("/authenticate", {
					code: authSessionResponse.params.code,
				});
				const { user: userResponse, token } = authResponse.data;

				api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(userResponse));
				await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));

				setUser(userResponse);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSigningIn(false);
		}
	}
	async function signOut() {
		setUser(null);
		await AsyncStorage.removeItem(USER_STORAGE);
		await AsyncStorage.removeItem(TOKEN_STORAGE);
	}

	useEffect(() => {
		setIsSigningIn(true);
		async function loadStorageData() {
			const userStorage = await AsyncStorage.getItem(USER_STORAGE);
			const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

			if (userStorage && tokenStorage) {
				api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`;
				setUser(JSON.parse(userStorage));
			}

			setIsSigningIn(false);
		}

		loadStorageData();
	}, []);

	return (
		<AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	return useContext(AuthContext);
}

export { AuthProvider, useAuth };
