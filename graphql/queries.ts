import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
	query getSubreddit($topic: String!) {
		getSubredditListByTopic(topic: $topic) {
			id
			topic
			created_at
		}
	}
`;

export const GET_ALL_POSTS = gql`
	query getPostList {
		getPostList {
			created_at
			description
			id
			media
			subreddit {
				created_at
				id
				topic
			}
			subreddit_id
			username
			topic
			title
			comments {
				created_at
				id
				post_id
				text
				username
			}
			votes {
				created_at
				id
				post_id
				upvote
				username
			}
		}
	}
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
	query getPostListByTopic($topic: String!) {
		getPostListByTopic(topic: $topic) {
			created_at
			description
			id
			media
			subreddit {
				created_at
				id
				topic
			}
			subreddit_id
			username
			title
			comments {
				created_at
				id
				post_id
				text
				username
			}
			votes {
				created_at
				id
				post_id
				upvote
				username
			}
		}
	}
`;

export const GET_ALL_POSTS_BY_SUBREDDIT_TOPIC = gql`
	query getPostListBySubredditTopic($topic: String!) {
		getPostListBySubredditTopic(topic: $topic) {
			created_at
			description
			id
			media
			subreddit {
				created_at
				id
				topic
			}
			subreddit_id
			username
			title
			comments {
				created_at
				id
				post_id
				text
				username
			}
			votes {
				created_at
				id
				post_id
				upvote
				username
			}
		}
	}
`;

export const GET_ALL_SUBREDDIT = gql`
	query getSubredditList {
		getSubredditList {
			created_at
			id
			topic
		}
	}
`;

export const GET_POST_BY_POST_ID = gql`
	query getPostByPostId($id: ID!) {
		getPostByPostId(id: $id) {
			created_at
			description
			id
			media
			subreddit {
				created_at
				id
				topic
			}
			subreddit_id
			username
			title
			comments {
				created_at
				id
				post_id
				text
				username
			}
			votes {
				created_at
				id
				post_id
				upvote
				username
			}
		}
	}
`;
