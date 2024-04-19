declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

//tsx에서 module.css 사용하기 위한 세팅, 

declare module "quilljs-markdown" {
  const QuillMarkdown: any;

  export default QuillMarkdown;
}
