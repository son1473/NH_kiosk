import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import { collection, getDocs, doc, writeBatch } from "firebase/firestore/lite";



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
  const [selectionModel, setSelectionModel] = React.useState<any[]>([]);

  const handleSortChange = (newSortModel:any) => {
    setSortModel(newSortModel);
  };

  const handleSelectionChange = (params: any) => {
    setSelectionModel(params);
  };

  const handleDeleteSelectedRows = async () => {
    if (window.confirm("삭제하면 복구할 수 없습니다.\n정말 삭제하시겠습니까?")) {
      // 선택된 행 삭제 로직
      const updatedRows = fetchedRows.filter(row => !selectionModel.includes(row.id));
      // Firebase에서 선택된 문서 삭제
      try {
        const batch = writeBatch(db);

        selectionModel.forEach(async selectedId => {
        // await deleteDoc(doc(db, 'orders', selectedId));
        const docRef = doc(db, 'orders', selectedId);
        // batch를 사용해 여러 개 삭제를 1번의 쓰기로 적용
        batch.delete(docRef);
        });
        await batch.commit();
        console.log('선택된 행을 Firebase에서 삭제했습니다.', updatedRows);
      } catch (error) {
      console.error('삭제 중 오류가 발생했습니다:', error)
      }
      setFetchedRows(updatedRows);
    }
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


  // 데이터를 CSV 형식으로 변환
  function convertToCSV(data: any[]) {
    const header = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(obj =>
      Object.values(obj).map((value:any) =>
        typeof value === 'string' && value.includes(',') ? `"${value}"` :
        typeof value === 'object' ? 
        new Date(value.seconds*1000).toLocaleString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }) 
        : value
      ).join(',')
    ).join('\n');
    return header + rows;
  }
  
  

  // CSV 파일로 저장 및 다운로드
  function saveCSVToFile(csvData: string) {
    const blob = new Blob(["\ufeff"+csvData], { type: 'text/csv;charset=utf-8' }); // MIME 타입 변경
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '이웃사랑 바자회 청년부 카페 회계내역.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // CSV 파일로 저장 버튼 클릭 시 처리
  function handleDownloadClick() {
    const saveData = fetchedRows.map(item => ({
      주문번호: item.orderNum,
      주문내역: item.orderDetails,
      결제금액: item.totalPrice,
      주문시간: item.created_at,
    }));
    
    const csvData = convertToCSV(saveData);
    saveCSVToFile(csvData);
  }
  
  return (
    <React.Fragment>
      <Container>
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', minHeight:"60px"}}>
        <Typography sx={{fontSize:'2rem', fontFamily: "Gowum"}}> ✨남현 카페 주문목록☕</Typography>
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
        {selectionModel.length > 0 && ( // 선택된 행이 있을 때만 버튼이 나타남
        <Button sx={{fontSize:'0.8rem'}} onClick={handleDeleteSelectedRows}>
          주문 삭제
        </Button>
      )}
          <Typography sx={{fontSize:'1.4rem', fontFamily: "Gowum"}}> 총 판매액:</Typography>
          <Typography sx={{fontSize:'1.8rem', fontWeight:'bold', fontFamily: "Gowum"}}> {totalPriceSum.toLocaleString()}원</Typography>
          <Button sx={{fontSize:'0.8rem'}} onClick={handleDownloadClick}>회계 내역 다운로드</Button>
          
        </Box>
            </Box>
        <Box 
        // sx={{ height: '500px', width: '100%' }}
        >
      <DataGrid
        rows={fetchedRows}
        columns={columns}
        sx={{fontWeight:'bold'}}
        sortModel={sortModel}
        onSortModelChange={handleSortChange}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
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
