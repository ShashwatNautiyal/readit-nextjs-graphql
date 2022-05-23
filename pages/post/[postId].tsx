import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import PostContainer from "../../components/PostContainer";

const PostPage: NextPage = () => {
	const {
		query: { postId },
	} = useRouter();

	return (
		<>
			<PostContainer id={postId} />
		</>
	);
};

export default PostPage;
