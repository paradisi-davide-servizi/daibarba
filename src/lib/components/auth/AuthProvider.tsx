"use client"

import {
	SupabaseClient,
	createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

export const supabase = createClientComponentClient();

const AuthContext = React.createContext<{ }>({
	supabase: undefined,
});

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider(props: PropsWithChildren) {
	return (
		<AuthContext.Provider value={{ }}>
			{props.children}
		</AuthContext.Provider>
	);
}
