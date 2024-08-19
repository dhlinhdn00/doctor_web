import React from 'react';
import InferenceGraph from './InferenceGraph';

const Chart = (props) => {
  const { result } = props;
  
  return <InferenceGraph startPoint={0} length={result.ecg[0].length - result.ecg[0].length / 2} inference={result.ecg[0]} />;

}
export default Chart;