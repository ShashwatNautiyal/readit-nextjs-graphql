import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export const capitalize = (name: string) => {
	if (!name) {
		return "";
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

	const datesDiff = Math.floor((curr.getTime() - post.getTime()) / (1000 * 60 * 60 * 24));

	if (datesDiff > 365) {
		const yearCount = Math.floor(datesDiff / 365);
		return `${yearCount} year${yearCount > 1 ? "s" : ""} ago`;
	} else if (datesDiff > 30) {
		const monthCount = Math.floor(datesDiff / 30);
		return `${monthCount} month${monthCount > 1 ? "s" : ""} ago`;
	} else if (datesDiff > 0) {
		const dateCount = datesDiff;
		return `${dateCount} day${dateCount > 1 ? "s" : ""} ago`;
	} else if (curr.getTime() - post.getTime() > 0) {
		const timeCount = curr.getTime() - post.getTime();
		if (timeCount / 1000 < 60) {
			return `${Math.floor(timeCount / 1000)} second${
				Math.floor(timeCount / 1000) > 1 ? "s" : ""
			} ago`;
		} else if (timeCount / 60000 < 60) {
			return `${Math.floor(timeCount / 60000)} minute${
				Math.floor(timeCount / 60000) > 1 ? "s" : ""
			} ago`;
		} else if (timeCount / 3600000 < 60) {
			return `${Math.floor(timeCount / 3600000)} hour${
				Math.floor(timeCount / 3600000) > 1 ? "s" : ""
			} ago`;
		}
	}

	return "";
};

export const revalidate = async (path: string) => {
	const { data } = await axios.get(`${DOMAIN}/api/revalidate`, {
		params: {
			secret: process.env.NEXT_PUBLIC_REVALIDATE_TOKEN,
			path: path,
		},
	});
};

export const DOMAIN = process.env.NEXT_PUBLIC_VERCEL_ENV
	? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
	: "http://localhost:3000";
