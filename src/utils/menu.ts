// 문자열을 키로 가지고, 숫자를 값으로 가지는 딕셔너리
interface StringNumberDictionary {
  [key: string]: number;
}

export const MENU: StringNumberDictionary= {
  "아메리카노(ICE)": 2000,
  "아메리카노(HOT)": 2000,
  "믹스커피(ICE)": 2000,
  "믹스커피(HOT)": 2000,
  "아이스티": 3000,
  "아이스초코": 3000,
  "미숫가루": 3000,
  "페퍼민트 티(ICE)": 2000,
  "페퍼민트 티(HOT)": 2000,
  "루이보스 티(ICE)": 2000,
  "루이보스 티(HOT)": 2000,
  "기타": 1000,
};

export const menuKey = Object.keys(MENU);
