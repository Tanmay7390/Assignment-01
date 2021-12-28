import React, { useState, useMemo,useEffect } from 'react';
import Pagination from './assets/Pagination';
import './css/style.scss';
import Axios from "axios";
import { useNavigate} from "react-router-dom";

let PageSize = 10;

export default function App() {

  const [data, setData] =useState([]);
  const navigate = useNavigate();

  const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'Cookie': 'csrftoken=q0FqcIRO1do5fs8c7A5xOA0tq9PwYicn24k7Ajv7AX0oVn9FUgUwI7WLtUwXxVXE; sessionid=wjtbes2w68vagjm123nj7jreughzpzhf; jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.bdfW8B6lG7RhPmHCtO6rPgf3IYlDwAJc7LUKtfTE2eU; tran=satmis1000003',
  }

  useEffect(()=>{
    Axios.post('https://myphysio.digitaldarwin.in/api/get-patient/', {"id":1}, {
        headers: headers
      })
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
      })
      
  },[]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const currentTableData = useMemo(() => {
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
    return data ? data.slice(firstPageIndex, lastPageIndex):"";
  });

  return (
    <>
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100">
          <button className="btn pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-primary" type="button"
          style={{position:"absolute",right:20,top:24,borderRadius:10,backgroundColor:"#36304a",border:"none"}}
          onClick={()=>{
            localStorage.setItem('login-state','logout');
            navigate('/login');
          }}>Logout</button>
					<table>
						<thead>
							<tr className="table100-head">
								<th className="column1">Patient Code</th>
								<th className="column2">Name</th>
								<th className="column3">Date of Birth</th>
								<th className="column4">Mobile No</th>
							</tr>
						</thead>
        <tbody>
          {currentTableData ? currentTableData.map(item => {
            return (
              <tr key={item.pp_patm_id}>
                <td className="column1">{item.patient_code}</td>
                <td className="column2">{item.first_name}  {item.last_name}</td>
                <td className="column3">{item.dob}</td>
                <td className="column4">{item.mobile_no}</td>
              </tr>
            );
          }):""}
        </tbody>
        </table>
				</div>
        <div className='center'>
    <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
    />
    </div>
			</div>
		</div>
    
    </>
  );
}
