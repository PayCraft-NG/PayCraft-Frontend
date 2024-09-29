import { create } from "zustand";

interface AuthStoreProps {
	accessToken: string | null;
	actions: {
		setAccessToken: (token: string) => void;
		logout: () => void;
	};
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
	accessToken: null,
	actions: {
		setAccessToken: (token) => set({ accessToken: token }),
		logout: () => set({ accessToken: null }),
	},
}));

export const useAuth = () => useAuthStore((s) => s.accessToken);

export const useAuthActions = () => useAuthStore((s) => s.actions);
