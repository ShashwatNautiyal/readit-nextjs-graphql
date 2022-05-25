import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	PreviewData,
} from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import HomeContainer from "../components/HomeContainer";
import { capitalize } from "../utils";

const TopicsPage = ({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<NextSeo
				title={`${capitalize(query.topicName as string)}`}
				canonical={`${process.env.NEXT_VERCEL_DOMAIN}/${query}`}
			/>
			<HomeContainer topicName={query.topicName} />
		</>
	);
};

export const getServerSideProps = async ({ query, resolvedUrl }: GetServerSidePropsContext) => {
	return { props: { query } };
};

export default TopicsPage;
