import React, {useState} from 'react';
import Display from '../../components/DisplayComponents/Display';
import Numbers from '../../components/ButtonComponents/NumberButtons/Numbers'
import Operators from '../../components/ButtonComponents/OperatorButtons/Operators';
import Specials from '../../components/ButtonComponents/SpecialButtons/Specials';
import handleClick from '../../utils';

const Calculator = (props) => {
  const [calcState, setCalcState] = useState('');
  const [displayState, setDisplayState] = useState('0');
  const [newNumberInputReady, setNewNumberInputReady] = useState(false);

  const onButtonClick = (event) => {
    handleClick(
      event, 
      setCalcState, 
      calcState, 
      setDisplayState, 
      displayState, 
      newNumberInputReady, 
      setNewNumberInputReady
      );
  }

  return (
    <>
      <div className="display-container">
        <Display value={displayState} calcState={calcState} />
      </div>
      <section className="buttons">
        <div>
          <Specials className='specials' onClick={onButtonClick} />
          <Numbers className='numbers' onClick={onButtonClick} />
        </div>
        <div>
          <Operators className='operators' onClick={onButtonClick} />
        </div>
      </section>
    </>
  );
}
export default Calculator;
