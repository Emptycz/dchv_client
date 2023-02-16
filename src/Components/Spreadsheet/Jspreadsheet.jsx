import React, { useRef, useEffect, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';

import '../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css';
import { Dna } from 'react-loader-spinner';

// TODO: Refactor this to TS
// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const Jspreadsheet = ({ data, minDimensions, isError }) => {
  const [loading, setLoading] = useState(true);
  const jRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!jRef.current.jspreadsheet && (Array.isArray(data) && data.length !== 0 )) {
      console.log('init jspreadsheet');
      jspreadsheet(jRef.current, {
        data,
        minDimensions,
        toolbar: true,
        onchange: (e) => console.log(e, 'kek'),
        oneditionend: (e) => console.log(e, 'haf:'),
        onsave: (e) => console.log(e, 'save'),
      });
      setLoading(false);
    }
  }, [data]);

  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };

  return (
    <div className='flex flex-col justify-start items-start text-gray-800'>
      {loading ? (
        <div className='flex flex-col items-center self-center justify-center'>
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <span> {isError ? 'Server was unable to retrieve and format the CSV data' : 'Recreating file...'} </span>
        </div>
      ) : (
        <>
          <button type="button" onClick={addRow}> Add row </button>
        </>
      )}
      <div ref={jRef} />
    </div>
  );

};

export default Jspreadsheet;