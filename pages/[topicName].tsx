import { useRouter } from "next/router";
import React from "react";
import HomeContainer from "../components/HomeContainer";

const TopicsPage = () => {
	const {
		query: { topicName },
	} = useRouter();

	return (
		<>
			<HomeContainer topicName={topicName} />
		</>
	);
};

export default TopicsPage;
