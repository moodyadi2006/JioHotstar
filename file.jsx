const { Button } = require("@/components/ui/button");
const { useState } = require("react");

/**
 * 
 * 1. UI wala part -> HTML
 * 2. Business logic -> JS
 * 3. event listeners -> JS
 * 4. State : current UI -> matched (value)
 */
function Counter() {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    setCounter(counter - 1);
  };
  return (
    <div>
      <Button onClick={increment}>Increment</Button>
      <p>Count : {counter}</p>
      <Button onClick={decrement}>Decrement</Button>
    </div>
  );
}

export default Counter;