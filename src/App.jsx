import { useState, useEffect } from "react";
import './App.css';

function App() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        getTrans().then(setTransactions);
      }, []);
    

    useEffect(() => {
        let totalBalance = 0;
        for (const transaction of transactions) {
            totalBalance += transaction.price;
        }
        
        setBalance(totalBalance.toFixed(2));
    }, [transactions]);

    async function getTrans() {
      const url = "http://localhost:4000/api/transactions";
      
      try {
          const response = await fetch(url);
          
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          return await response.json();
      } catch (error) {
          console.error('Fetch error:', error.message);
          throw error;
      }
  }

    function addNewTrans(ev) {
        ev.preventDefault();
        const url = "http://localhost:4000/api"+"/transactions";
        const price = name.split(" ")[0];
        
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                price,
                name: name.substring(price.length + 1),
                desc,
                date
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            setName("");
            setDesc("");
            setDate("");
            setTransactions(prevTransactions => [...prevTransactions, json]);
        })
        .catch(error => {
            console.error('Error adding transaction:', error.message);
        });
    }

    return (
        <main>
            <h1>{balance} <span></span></h1>
            <form onSubmit={addNewTrans}>
                <div className='basic'>
                    <input 
                        type="text" 
                        value={name}
                        onChange={ev => setName(ev.target.value)}            
                        placeholder='cashflow'
                    />
                    <input 
                        type="datetime-local" 
                        value={date}
                        onChange={ev => setDate(ev.target.value)}
                    />
                </div>

                <div className='desc'>
                    <input 
                        type="text" 
                        value={desc}
                        onChange={ev => setDesc(ev.target.value)}
                        placeholder='description'
                    />
                </div>

                <button>Add transaction</button>
            </form>

            <div className='transactions'>
                {transactions.length > 0 && transactions.map((transaction, index) => (
                    <div className='transaction' key={transaction._id || index}>
                        <div className='left'>
                            <div className='name'>{transaction.name}</div>
                            <div className='description'>{transaction.desc}</div>
                        </div>
                        <div className='right'>
                            <div className={"price " + (transaction.price < 0 ? "red" : "green")}>{transaction.price}</div>
                            <div className='date'>{transaction.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default App;
