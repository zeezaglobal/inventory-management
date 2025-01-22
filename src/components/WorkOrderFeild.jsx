import * as React from 'react';

import { Input } from 'antd';


export default function WorkOrderFeild({ }) {


  return (
    <div>
    <div style={{ marginRight: 12,marginBottom:12 }}>
      <Input addonBefore="WO#"  placeholder="Work Order Number" />
    </div>
   
  
  </div>
  );
}