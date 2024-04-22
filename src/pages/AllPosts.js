import React, { useState, useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import appwriteService from "../appwrite/config";
const [posts, setPosts] = useState([]);

useEffect(() => {
  if (posts) {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }
}, []);
function AllPosts() {
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
