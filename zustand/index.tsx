import create from "zustand";

interface MenuState {
	menuOpen: boolean;
	setMenuOpen: (value?: boolean) => void;
}

export const useStore = create<MenuState>()((set) => ({
	menuOpen: false,
	setMenuOpen: (value) =>
		set((state) => {
			return { menuOpen: value };
		}),
}));
