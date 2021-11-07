import React, { createContext, useContext, useState } from "react";

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

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user] = useState<User | null>(null);
	const [isSigningIn] = useState<boolean>(false);

	async function signIn() {
		// signIn function
	}
	async function signOut() {
		// signOut function
	}
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
