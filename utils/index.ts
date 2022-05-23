import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export const capitalize = (name: string) => {
	if (!name) {
		return null;
	}
	return name
		.split(" ")
		.map((item) => item?.[0]?.toUpperCase() + item.slice(1).toLowerCase())
		.join(" ");
};

export const getAgoDate = (date: string | undefined): string => {
	if (!date) return "";
	const postDate = new Date(date).getDate();
	const currDate = new Date().getDate();
	return `${currDate - postDate} days ago`;
};
