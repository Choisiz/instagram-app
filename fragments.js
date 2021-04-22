import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    user {
        id
        avatar
        userName
    }
    files {
        id
        url
    }
    likeCount
    isLiked
    comments {
        id
        text
        user {
            id
            avatar
            userName
        }
    }
    createdAt
}
`;

export const USER_FRAGMENT =gql`
    fragment UserParts on User {
            id
            avatar
            userName
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount
            postsCount
            posts {
                ...PostParts
            }
    }
    ${POST_FRAGMENT}
`;