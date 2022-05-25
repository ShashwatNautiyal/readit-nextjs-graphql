import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import ButtonPrimary from "../components/reusable/ButtonPrimary";

const Error: NextPage = () => {
	return (
		<div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto flex md:flex-row flex-col md:mt-0 mt-10 items-center justify-between h-full">
			<div className="flex flex-col gap-3 md:items-start items-center">
				<h1 className="text-gray-800">404 error</h1>
				<h2 className="md:text-5xl text-3xl font-semibold">Page not found...</h2>
				<h3 className="text-gray-600 w-5/6 md:text-left text-center">
					Sorry, the page you are looking for doesn&apos;t exist or has been moved.
				</h3>
				<Link href={"/"} passHref>
					<a>
						<ButtonPrimary size="small" text="Back to Homepage" />
					</a>
				</Link>
			</div>
			<img className="lg:max-w-sm  max-w-xs w-screen" src="/page-not-found.png" alt="" />
		</div>
	);
};

export default Error;
