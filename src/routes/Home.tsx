import { Box, Container } from "@mui/material";
import Questions from "components/question/Questions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionHeader from "../components/question/QuestionHeader";
import { RootState } from "../stores";
import { getAllBlogPosts } from "../stores/blogPost.slice";
import { BlogPost } from 'domain/type/blogPostInteface';
import { defaultBlogPost } from 'domain/type/blogPostInteface';

function Home() {
  const dispatch = useDispatch();

  const { loading, blogPosts, error } = useSelector(
    (state: RootState) => state.blogPost
  ); 

  useEffect(() => {
    // dispatch(getAllBlogPosts());
    // console.log("🚀 리덕스 스토어 내의 blogPosts", blogPosts);
  }, []);

  return (
    <React.Fragment>
      {/* {loading ? null : error ? null : ( */}
        <Container fixed>
          <Box
            sx={{
              minHeight: "150vh",
            }}
          >
            <QuestionHeader questions={blogPosts} />
            <Questions questions={blogPosts} />
          </Box>
        </Container>
      {/* )} */}
    </React.Fragment>
  );
}

export default Home;
