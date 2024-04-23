import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// 행 종류
const columns: GridColDef<[number]>[] = [
  { field: 'orderNum', headerName: '주문 번호', align:'center' },
  { field: 'orderDetails', headerName: '주문 내역', headerAlign: 'center', editable:true, width: 600},
  { field: 'totalPrice', headerName: '결제 금액', type: 'number' },
  { field: 'created_at', headerName: '주문 시간', type: 'string', width: 120,
  valueGetter: (params: any) => {
    return new Date(params.seconds*1000).toLocaleString('ko-KR', {
      // month: 'short',
      // day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    ;
  },
},
];
function OrderList() {
  const [fetchedRows, setFetchedRows] = useState<any[]>([])
  const [totalPriceSum, setTotalPriceSum] = useState(0)
  const [sortModel, setSortModel] = useState<any[]>([{ field: 'orderNum', sort: 'desc' }]);

  const handleSortChange = (newSortModel:any) => {
    setSortModel(newSortModel);
  };

  

  async function getOrders() {
    const collectionRef = collection(db, 'orders');
    const querySnapshot = await getDocs(collectionRef);
    const data: any[] = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firebase 문서의 고유 ID를 id로 사용
      created_at: doc.data().created_at,
      ...doc.data(), // Firebase 문서의 데이터를 그대로 사용
    }));
    console.log(data,'가져온 주문 정보 출력')
    setFetchedRows(data)
    const totalPriceSum = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.totalPrice;
    }, 0);
    setTotalPriceSum(totalPriceSum)

  }

  // 랜더링 시에만, 주문 내역 가져오기.
  useEffect(() => {
    getOrders();
  }, []);
  
  return (
    <React.Fragment>
      <Container>
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', minHeight:"60px"}}>
        <Typography sx={{fontSize:'2rem'}}> ✨남현 카페 주문목록☕</Typography>
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
          <Typography sx={{fontSize:'1.4rem'}}> 총 판매액:</Typography>
          <Typography sx={{fontSize:'1.8rem', fontWeight:'bold'}}> {totalPriceSum.toLocaleString()}원</Typography>
        </Box>
            </Box>
        <Box sx={{ height: '500px', width: '100%' }}>
      <DataGrid
        rows={fetchedRows}
        columns={columns}
        sx={{fontWeight:'bold'}}
        
        sortModel={sortModel}
        onSortModelChange={handleSortChange}
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
      </Container>
    </React.Fragment>
  );
}

export default OrderList;
