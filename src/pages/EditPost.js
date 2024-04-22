import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
const [post, setPost] = useState(null);
const { slug } = useParams();
const navigate = useNavigate();
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
useEffect(
  (slug) => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  },
  [slug, navigate]
);
function EditPost() {
  return (
    <div className="py-6">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
