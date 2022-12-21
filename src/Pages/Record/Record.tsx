import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord, IRecordData } from '../../types';

import './Record.scss';
import Jspreadsheet from '../../Components/Spreadsheet/Jspreadsheet';
import { Dna } from 'react-loader-spinner';

type RecordProps = {
  recordId: string,
}

type EditCellType = {
  value: string,
  columnId: number,
  rowId: number,
};

const Record = () => {
  const { recordId } = useParams<RecordProps>();
  const history = useNavigate();

  if (!recordId) {
    history('/records');
  }

  const axios = useAxios();

  const { data, isLoading } = useQuery(
    ['getRecordDetail', recordId],
    async () => {
      const { data: record } = await axios.get<IRecord>(`/record/${recordId}`);
      return record;
    }
  );

  const completeEdit = ({ value, columnId, rowId }: EditCellType) => {
    // TODO: We need to implement onEditComplete function
    //       that will modify the data
  };

  const getSpreadsheetData = useCallback((data?: IRecordData[]) => {
    if (!data) return [];
    const rows: Array<string[]> = [];

    const numberOfCols = data.filter(x => x.column === data[0].column).length;
    let row: string[] = new Array<string>().fill('', 0, numberOfCols);

    for (let i = 0; i < data?.length; i++) {
      row[data[i].column] = data[i]?.value;
      if (data[i].row !== data[i + 1]?.row) {
        rows.push(row);
        row = new Array<string>().fill('', 0, numberOfCols);
      }
    }

    return rows;
  }, []);

  const formatedData = getSpreadsheetData(data?.data);

  return (
    <>
      <h1> {data?.name} </h1>
      <Jspreadsheet isError={!isLoading && !data?.data.length} data={formatedData} minDimensions={[30, 30]} />
    </>
  );
};

export default Record;
