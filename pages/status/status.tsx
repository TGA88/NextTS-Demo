import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Typography,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: string;
  amount: number;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' ,
  filters: [
    { text: 'ชำระ', value: 'name' },
    { text: 'รอตรวจสอบ', value: 'wait' },
    { text: 'ชำระแล้ว', value: 'success' },

  ],

},
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    // render: value => (value === 'React.Key' ? <Link href={'/'}>ยืนยันการฝาก</Link> : value)
    render: value => ( <Link href={'/status/bill'} ><Button color="primary">ยืนยันการฝาก</Button></Link>)

  },
];

const data: DataType[] = [
  {
    key: 1,
    name: '11-jan-2023',
    amount: 32,
    description: '#Booking 123084920320 update',
  },
  {
    key: 2,
    name: '12-jan-2023 update',
    amount: 12,
    description: '#Booking 1230849203201 update',
  },

];

export default function status() {
  return (
    <Container>
      <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
        สถานะการฝาก
      </Typography>
      <Box className="grid grid-cols-2 gap-4 mt-3rem  ">
        <CardActionArea>
          <Card
            sx={{
              height: "5rem",
              textAlign: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h4" component="div" color="text.secondary">
              101 B
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="h6" color="text.secondary">
              Credits Avalible
            </Typography>
          </Card>
        </CardActionArea>
        <CardActionArea>
          <Card
            sx={{
              height: "5rem",
              textAlign: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h4" component="div" color="text.secondary">
              0 B
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="h6" color="text.secondary">
              Settlements
            </Typography>
          </Card>
        </CardActionArea>
      </Box>

<Box sx={{marginTop:5}}>
   <Table
    
    columns={columns}
    expandable={{
      expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,

    }}
      
    
    dataSource={data}
  />
  </Box>
  <Link href="/dashboard/dashboard" passHref>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginLeft: 1 }}
                    >
                      กลับ
                    </Button>
                    </Link>
    </Container>
  );
}
