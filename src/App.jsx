import { useState, useEffect } from "react";
import './App.css'

function App() {
    const[name ,setName]=useState("");
    const[date,setdate]=useState("");
    const[desc,setDesc]=useState("");
    const[transactions,settransactions]=useState("");

    useEffect(() => {
      gettrans().then(settransactions);
    }, []);
    
    async function gettrans() {
      // const url = process.env.VITE_REACT_APP_API_URL + "/transactions";
      const url = "http://localhost:5000/api" + "/transactions";
      const response = await fetch(url); 
      console.log(response); 
      return await response.json();
  }
  
   function addnewtrans(ev){
      ev.preventDefault();
      // const url = process.env.VITE_REACT_APP_API_URL + "/transaction"; // Should be 'https://your-backend-url'
      const url = "http://localhost:5000/api" + "/transaction";
      console.log(url);

      const price = name.split(" ")[0];
      fetch(url, {
        
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          price,
          name:name.substring(price.length+1),
          desc,
          date}),
      })

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(json => {
        setName("");
        setDesc("");
        setdate("");
        console.log('result', json);
      })
    }
let balance = 0;
for (const transaction of transactions) {
  balance = balance + transaction.price;
}
balance = balance.toFixed(2);

    return(
      <main>
        <h1>{balance} <span></span></h1>
      <form onSubmit={addnewtrans}>
        <div className='basic'>
          <input type="name" 
                  value={name}
                  onChange={ev => setName(ev.target.value)}            
                  placeholder='cashflow'/>

          <input type="datetime-local/" 
                  value={date}
                  onChange={ev=> setdate(ev.target.value)}                  
                  />
        </div>

        <div className='desc'>
          <input type="text" 
                value={desc}
                onChange={ev=>setDesc(ev.target.value)}
                placeholder='description'/>
        </div>


        <button>Add transaction</button>
        {transactions.length}
      </form>
      
      {/* <div className='transactions'>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>Bought a TV</div>
            <div className='description'>Needed a TV</div>
          </div>
          <div className='right'>
            <div className='mon red'>-$400</div>
            <div className='date'>1204-2024 /13:59</div>
            </div>
        </div>
      </div>
  
     
       <div className='transactions'>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>samsung</div>
            <div className='description'>phone</div>
          </div>
          <div className='right'>
          <div className='mon red'>-$400</div>
            <div className='date'>1204-2024 /13:59</div>
          </div>
            
        </div>
      </div> */}
      
      <div className='transactions'>
          {transactions.length > 0 && transactions.map((transaction, index) => (
              <div className='transaction' key={transaction._id || index}> {/* Added key prop */}
                  <div className='left'>
                      <div className='name'>{transaction.name}</div>
                      <div className='description'>{transaction.desc}</div>
                  </div>
                  <div className='right'>
                      <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>{transaction.price}</div>
                      <div className='date'>{transaction.date}</div>
                  </div>
              </div>
          ))}
      </div>

      </main>
  );
}

export default App
