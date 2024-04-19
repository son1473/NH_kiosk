import { apiRequest } from ".";

const getBlogPosts = async () => {
  try {
    const response = await apiRequest.get(`/blogposts`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const getBlogPost = async (id: string) => {
  try {
    const response = await apiRequest.get(`/blogposts/${id}`);
    const { data } = response;
    console.log("🚀 블로그 내용 출력", data);
    return data;
  } catch (err) {
    return err;
  }
};

const closeBlogPost = async (id: string) => {
  try {
    const response = await apiRequest.patch(`/blogposts/close/${id}`, {
      closed: true,
    });
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const deleteBlogPost = async (id: string) => {
  try {
    const response = await apiRequest.delete(`/blogposts/${id}`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const postBlogPost = async (BlogPost: any) => {
  try {
    const response = await apiRequest.post(`/blogposts`, BlogPost);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const blogPostService = {
  getBlogPosts,
  getBlogPost,
  postBlogPost,
  deleteBlogPost,
  closeBlogPost,
};

export default blogPostService;
