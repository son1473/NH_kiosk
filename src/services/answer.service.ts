import { apiRequest } from ".";

const getAnswers = async (questionId: string) => {
  try {
    const response = await apiRequest.get(`/answers/${questionId}`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const getAnswer = async (id: string) => {
  try {
    const response = await apiRequest.get(`/answers/${id}`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const postAnswer = async (answer: any) => {
  try {
    const response = await apiRequest.post(`/answers`, answer);
    const { data } = response;
    console.log("🚀 SUCCESS!!", response);
    return data;
  } catch (err) {
    return null;
  }
};

const chooseAnswer = async (id: string) => {
  try {
    const response = await apiRequest.patch(`/answers/choose/${id}`);
    const { data } = response;
    console.log("🚀 SUCCESS!!", data);
    return data;
  } catch (err) {
    console.log("🚀 ERROR!!", err);
    return err;
  }
};

const deleteAnswer = async (id: string) => {
  try {
    const response = await apiRequest.delete(`/answers/${id}`);
    const { data } = response;
    return data;
  } catch (err) {
    console.log(
      "🚀 ~ file: answer.service.ts ~ line 52 ~ deleteAnswer ~ err",
      err
    );
  }
};

const answerService = {
  getAnswers,
  deleteAnswer,
  chooseAnswer,
  getAnswer,
  postAnswer,
};

export default answerService;
