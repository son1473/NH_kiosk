import { User } from "../domain/type/userInterface";
import { apiRequest } from ".";

async function register(userAddress: string) {
  try {
    console.log("새로운 유저입니다. 생성합니다.");
    const response = await apiRequest.post(`/users`, {
      address: userAddress,
    });
    const newUser: User = response.data.user;
    console.log(response.data.user, "생성 완료했습니다. 로그인 합니다.");
    return newUser;
  } catch (err) {
    console.log(err, "새로운 유저를 생성하지 못했습니다.");
    return undefined;
  }
}

export async function login(userAddress: string) {
  if (userAddress) {
    try {
      console.log("주소 존재여부를 확인합니다.");
      const checkUserAddressRes = await apiRequest.get(
        `/users/check/${userAddress}`
      );
      const user: User = checkUserAddressRes.data;
      if (user) {
        console.log(user, "기존에 존재하는 유저입니다. 로그인 합니다.");
        return user;
      } else {
        //자동 회원가입? 존재하지 않습니다.
        const newUser: User | undefined = await register(userAddress);
        return newUser;
      }
    } catch (err) {
      console.log(err, "주소 존재여부 확인 에러 or 새로운 유저 생성 불가 에러");
      return undefined;
    }
  } else {
    //metamask 로그인 없어짐.
    console.log("메타마스크 연결이 종료되었습니다. - 로그아웃 합니다.");
    return undefined;
  }
}

const authService = {
  register,
  login,
};

export default authService;
