import { gql } from "@apollo/client";

export const ADD_POST = gql`
	mutation addPost(
		$description: String!
		$media: String!
		$subreddit_id: ID!
		$title: String!
		$username: String!
		$topic: String!
	) {
		insertPost(
			description: $description
			media: $media
			subreddit_id: $subreddit_id
			title: $title
			username: $username
			topic: $topic
		) {
			created_at
			description
			id
			media
			subreddit_id
			title
			username
		}
	}
`;

export const ADD_SUBREDDIT = gql`
	mutation addSubreddit($topic: String!) {
		insertSubreddit(topic: $topic) {
			id
			topic
			created_at
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment($post_id: ID!, $username: String!, $text: String!) {
		insetComment(post_id: $post_id, text: $text, username: $username) {
			created_at
			id
			post_id
			text
			username
		}
	}
`;

export const ADD_VOTE = gql`
	mutation addVote($post_id: ID!, $username: String!, $upvote: Boolean!) {
		insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
			created_at
			id
			post_id
			upvote
			username
		}
	}
`;
