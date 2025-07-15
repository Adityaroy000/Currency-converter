import React, { useId } from 'react'

function InputBox({
  label,
  amount,
  selectCurrency,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  amountDisable = false,
  currencyDisable = false,
  className=""
}) {

  const amountId = useId();

  return (
    <div className={`bg-white/90 backdrop-blur-sm p-4 rounded-xl text-sm flex shadow-md border border-white/50 ${className}`}>
      <div className="w-1/2 pr-3">
        <label htmlFor={amountId} className="text-gray-600 inline-block mb-2 font-medium">{label}</label>
        <input id={amountId}
          className="outline-none bg-transparent py-2 w-full text-lg font-semibold text-gray-800 placeholder-gray-400 border-b border-gray-200 focus:border-blue-500 transition-colors"
          type="number"
          value={amount || ""}
          placeholder="0"
          disabled = {amountDisable}
          onChange={(e)=>{
            const value = e.target.value;
            onAmountChange && onAmountChange(value === "" ? 0 : Number(value));
          }}
        ></input>
      </div>

      <div className="w-1/2 pl-3 flex flex-wrap justify-end text-right border-l border-gray-200">
        <p className="text-gray-600 mb-2 w-full font-medium">Currency Type</p>
        <select 
          className="rounded-lg px-3 py-2 outline-none bg-gray-100 cursor-pointer text-sm min-w-[80px] max-w-[120px] border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          style={{
            appearance: 'menulist',
            overflow: 'hidden'
          }}
          value={selectCurrency}
          disabled = {currencyDisable}
          onChange={(e)=>{onCurrencyChange && onCurrencyChange((e.target.value))}}
          size="1"
        >
          {currencyOptions.map((currency)=>(
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox