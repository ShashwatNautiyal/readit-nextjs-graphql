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
	const post = new Date(date);
	const curr = new Date();

	if (curr.getFullYear() - post.getFullYear() > 0) {
		const yearCount = curr.getFullYear() - post.getFullYear();
		return `${yearCount} year${yearCount > 1 ? "s" : ""} ago`;
	} else if (curr.getMonth() - post.getMonth() > 0) {
		const monthCount = curr.getMonth() - post.getMonth();
		return `${monthCount} month${monthCount > 1 ? "s" : ""} ago`;
	} else if (curr.getDate() - post.getDate() > 0) {
		const dateCount = curr.getDate() - post.getDate();
		return `${dateCount} day${dateCount > 1 ? "s" : ""} ago`;
	} else if (curr.getTime() - post.getTime() > 0) {
		const timeCount = curr.getTime() - post.getTime();
		if (timeCount / 1000 < 60) {
			const display = (timeCount / 1000).toFixed(0);
			return `${display} second${timeCount / 1000 > 1 ? "s" : ""} ago`;
		} else if (timeCount / 60000 < 60) {
			const display = (timeCount / 60000).toFixed(0);
			return `${display} minute${timeCount / 60000 > 1 ? "s" : ""} ago`;
		} else if (timeCount / 3600000 < 60) {
			const display = (timeCount / 3600000).toFixed(0);
			return `${display} hour${timeCount / 3600000 > 1 ? "s" : ""} ago`;
		}
	}

	return "";
};
