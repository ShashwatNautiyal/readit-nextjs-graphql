import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import ButtonPrimary from "../components/reusable/ButtonPrimary";

const ServerError: NextPage = () => {
	return (
		<>
			<NextSeo
				title={`500 Internal server error`}
				canonical={`${process.env.NEXT_VERCEL_DOMAIN}/500`}
			/>

			<div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto flex md:flex-row flex-col md:mt-0 mt-10 items-center justify-between h-full">
				<div className="flex flex-col gap-3 md:items-start items-center">
					<h1 className="text-gray-800">500 error</h1>
					<h2 className="md:text-5xl text-3xl font-semibold">Server Side error...</h2>
					<h3 className="text-gray-600 w-4/6 md:text-left text-center">
						Sorry, there is internal server error at this moment. Pease visit this page
						after sometime.
					</h3>
					<Link href={"/"} passHref>
						<a>
							<ButtonPrimary size="small" text="Back to Homepage" />
						</a>
					</Link>
				</div>
				<img
					className="lg:max-w-[300px]  max-w-[250px] w-screen"
					src="/page-not-found.png"
					alt=""
				/>
			</div>
		</>
	);
};

export default ServerError;
