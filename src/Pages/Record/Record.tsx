import ReactDataGrid from '@inovua/reactdatagrid-community';
import { TypeColumn } from '@inovua/reactdatagrid-community/types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { IRecord, IRecordData } from '../../types';

import '@inovua/reactdatagrid-community/index.css';
import Spreadsheet, { Matrix } from 'react-spreadsheet';

import './Record.scss';

type RecordProps = {
  recordId: string,
}

type TableCell = {
  value: string,
}

type EditCellType = {
  value: string,
  columnId: number,
  rowId: number,
};


const Cell = ({key, value}: {key: number, value?: string }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <td
      key={key}
      className={`border-2 w-24 h-10 truncate flex items-center ${isSelected ? 'bg-blue-300' : ''}`}
      onClick={() => {
        setIsSelected(!isSelected);
      }}
    >
      {value}
    </td>
  );
};


const generateColumns = (length: number) => {
  const letterCount = 26;
  const alphabet:string[] = [];
  for (let i = 0; i < length / letterCount; i++) {
    const alpha = Array.from(Array(letterCount)).map((e, i) => i + 65);
    alpha.map((x) => alphabet.push(String.fromCharCode(x)));
  }
  console.log(alphabet);
  return alphabet;
};

const Record = () => {
  const { recordId } = useParams<RecordProps>();
  const history = useNavigate();

  if (!recordId) {
    history('/records');
  }

  const [record, setRecord] = useState<IRecord>();
  const [tableData, setTableData] = useState<Matrix<{value: string}>>([]);

  const { token } = useContext(AuthContext);
  const axios = useAxios(token);

  useQuery(
    ['getRecordDetail', recordId],
    async () => {
      const { data }: { data: IRecord } = await axios.get(`/record/${recordId}`);
      setRecord(data);
      setTableData(getData(data.data));
    }, {
      refetchOnWindowFocus: false,
    }
  );

  const completeEdit = ({ value, columnId, rowId }: EditCellType) => {
    // TODO: We need to implement onEditComplete function
    //       that will modify the data
  };

  const getData = useCallback((data: IRecordData[]): Matrix<{value: string}> => {
    const rows: Array<TableCell[]> = [];
    let row: TableCell[] = [];
    for (let i = 0; i < data?.length; i++) {
      // if (data[i].column !== 0 && data[i].column !== data[i - 1]?.column + 1) {
      //   row.push({ value: '' });
      // } else {
      // }
      row.push({value: data[i].value});
      if (data[i].row !== data[i + 1]?.row) {
        rows.push(row);
        row = [];
      }
    }
    // console.log(rows);
    return rows;
  }, [record?.data]);

  return (
    <>
      { !tableData ? 'loading...' : (
        <>
          <h1> {record?.name} </h1>
          {/* <Spreadsheet
            className="record__table"
            data={tableData}
          /> */}
          <table className='cursor-cell'>
            <tbody>
              <tr className='flex flex-row'>
                {generateColumns(tableData?.[0]?.length).map((x, i) => (
                  <td className='bg-gray-100 border-2 w-24 h-10 truncate flex items-center' key={i}> {x} </td>
                ))}
              </tr>
              {tableData.map((x, i) => (
                <tr className='flex flex-row' key={i}>
                  <td className='bg-gray-100 border-2 w-24 h-10 truncate flex items-center'> {i + 1} </td>
                  {x.map((y, r) => (
                    <Cell key={r} value={y?.value} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) }
    </>
  );
};

export default Record;
