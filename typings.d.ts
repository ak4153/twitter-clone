//type of the entry inside the Sanity Database
/*
[
  {
    "_createdAt": "2022-06-11T14:21:48Z",
    "_id": "ddbb7ec6-885b-414e-8c3b-3a561f36c92e",
    "_rev": "vOYBmzG0R4TianHAkj3wII",
    "_type": "tweet",
    "_updatedAt": "2022-06-11T14:21:48Z",
    "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.funimation.com%2Fblog%2Fwp-content%2Fuploads%2F2020%2F01%2FScreen-Shot-2020-01-13-at-3.33.29-PM.png&f=1&nofb=1",
    "profileImage": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fae%2F3a%2Fca%2Fae3aca79f94a03e5c09dd87ca86ad82c--transfer-paper-black-hoodie.jpg&f=1&nofb=1",
    "text": "Hello World",
    "username": "Ak4153"
  }
] */

export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'tweet';
  blockTweet: boolean;
}
export type TweetBody = {
  text: string;
  username: string;
  profileImage: string;
  image?: string;
};
export type Comment = {
  comment: string;
  username: string;
  profileImage: string;
};

export interface TweetComment extends Comment {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'comment';
  tweet: { _ref: string; _type: 'reference' };
}
