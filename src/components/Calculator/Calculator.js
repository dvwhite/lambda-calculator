import React, {useState} from 'react';
import Display from '../../components/DisplayComponents/Display';
import Numbers from '../../components/ButtonComponents/NumberButtons/Numbers'
import Operators from '../../components/ButtonComponents/OperatorButtons/Operators';
import Specials from '../../components/ButtonComponents/SpecialButtons/Specials';

const Calculator = (props) => {
  const [calcState, setCalcState] = useState(0);
  const [displayState, setDisplayState] = useState(0);
  return (
    <>
      <div className="display-container">
        <Display value={calcState}/>
      </div>
      <section className="buttons">
        <div>
          <Specials className='specials' calcState={calcState} calcSetter={setCalcState} />
          <Numbers className='numbers' calcState={calcState} calcSetter={setCalcState} />
        </div>
        <div>
          <Operators className='operators' calcState={calcState} calcSetter={setCalcState} />
        </div>
      </section>
    </>
  );
}
export default Calculator;
