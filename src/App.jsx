import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [currencies, setCurrencies] = useState({});
  
  const bodyStyle = {
    backgroundColor:'#db6d24',
    color:'white',
    position:'absolute',
    textAlign: 'center',
    width:'100%',
    height:'100%',
  };

  const tableStyle = {
    width: '500px',
    margin: '150px auto 15px auto',
  };

  const fetchData = async () => {
    const res = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=122d59c812c4497fa72421f62a479882&symbols=CAD,EUR,IDR,JPY,CHF,GBP');
    const data = await res.json();
    setCurrencies(data.rates);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const parseWeBuy = (rate) => {
    return (Number(rate)*105/100).toFixed(5);
  }

  const parseWeSell = (rate) => {
    return (Number(rate)*95/100).toFixed(5);
  }

  const parseRate = (rate) => {
    return Number(rate).toFixed(5);
  }

  return (
    <div style={bodyStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          { Object.entries(currencies).map(([key, item]) => {
              return <tr key={key}>
                <td>{ key }</td>
                <td>{ parseWeBuy(item) }</td>
                <td>{ parseRate(item) }</td>
                <td>{ parseWeSell(item) }</td>
              </tr>
            })
          }
        </tbody>
      </table>
      <small>
        Rates are based from 1 USD.
      </small>
      <br />
      <small>
        This application uses API from https://currencyfreaks.com.
      </small>
    </div>
  );
}

export default App;
