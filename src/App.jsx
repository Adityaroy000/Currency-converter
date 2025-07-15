import { InputBox } from "./components"
import { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount,setAmount] = useState(0);
  const [from,setFrom] = useState("USD");
  const [to,setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo("USD"); // Always use USD as base
  const options = ["USD", ...Object.keys(currencyInfo).map((key) => key.slice(3))];

  const convert = ()=>{
    // If amount is 0 or empty, set converted amount to 0
    if (!amount || amount === 0) {
      setConvertedAmount(0)
      return
    }

    if (from === "USD") {
      // Converting from USD to another currency
      const rateKey = "USD" + to
      const rate = currencyInfo[rateKey]
      if (rate) {
        setConvertedAmount(amount * rate)
      } else {
        setConvertedAmount(0)
      }
    } else if (to === "USD") {
      // Converting from another currency to USD
      const rateKey = "USD" + from
      const rate = currencyInfo[rateKey]
      if (rate) {
        setConvertedAmount(amount / rate)
      } else {
        setConvertedAmount(0)
      }
    } else {
      // Converting between two non-USD currencies
      const fromRate = currencyInfo["USD" + from]
      const toRate = currencyInfo["USD" + to]
      if (fromRate && toRate) {
        const usdAmount = amount / fromRate
        setConvertedAmount(usdAmount * toRate)
      } else {
        setConvertedAmount(0)
      }
    }
  }

  // Auto-convert when amount, from, to, or currencyInfo changes
  // useEffect(() => {
  //   convert();
  // }, [amount, from, to, currencyInfo]);

  const swap = ()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  return (
    <>
      <div className="w-full h-screen bg-cover bg-no-repeat flex justify-center items-center"
        style={{backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}}
      >
        <div className="w-full max-w-lg">
          <div className="w-full bg-white/20 border border-white/30 backdrop-blur-md mx-auto p-6 rounded-xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-black-700">Currency Converter</h1>
            <form 
              onSubmit={(e)=>{
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-4">
                <InputBox 
                  label = "From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency)=>(setFrom(currency))}
                  selectCurrency={from}
                  onAmountChange={(amount)=>(setAmount(amount))}
                />
              </div>

              <div className="relative w-full h-0.5 my-6">
                <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg hover:bg-blue-700 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={swap}
                >
                  ⇅ Swap
                </button>
              </div>
              <div className="w-full mt-4">
                <InputBox
                  label="To"
                  amountDisable
                  onCurrencyChange={(currency)=>{setTo(currency)}}
                  selectCurrency={to}
                  amount={convertedAmount}
                  currencyOptions={options}
                />
              </div>

              <button type="submit" className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-medium text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                Convert {from} to {to}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
