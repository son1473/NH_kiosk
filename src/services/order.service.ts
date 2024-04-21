import { apiRequest } from ".";

const getOrders = async () => {
  try {
    const response = await apiRequest.get(`/order`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const getOrderNum = async () => {
  try {
    const response = await apiRequest.get(`/order/num`);
    const { data } = response;
    console.log("🚀 주문 번호 출력", data);
    return data;
  } catch (err) {
    return err;
  }
};

const postOrder = async (orderForm: any) => {
  try {
    const response = await apiRequest.post(`/order`, orderForm);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const orderService = {
  getOrders,
  getOrderNum,
  postOrder,
};

export default orderService;
