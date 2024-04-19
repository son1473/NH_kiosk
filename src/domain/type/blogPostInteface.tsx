export interface BlogPost {
  id: string;
  // category: number;
  title: string;
  content: string;
  closed: boolean;
  created_at: string;
  owner: string;
}

export const defaultBlogPost: BlogPost = {
  id: "",
  // category: 0,
  title: "", 
  content: "",
  closed: false,
  created_at: "",
  owner: "",
};
