import { useState } from "react";
import './App.css'

function App() {
    const[name ,setName]=useState("");
    const[date,setdate]=useState("");
    const[desc,setDesc]=useState("");

   function addnewtrans(ev){
      ev.preventDefault();
      const url = import.meta.env.VITE_REACT_APP_API_URL + "/transaction"; // Should be 'https://your-backend-url'
      console.log(url);

      fetch(url, {
        // mode: 'no-cors',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, desc, date}),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        console.log('result', json);
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation:', error.message);
      });
    
      console.log(url);
    }
    

    return(
      <main>
        <h1>$400 <span>.00</span></h1>
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
      </form>
       {/* transaction 1 */}
      <div className='transactions'>
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
  
      {/* transaction 2 */}
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
      </div>
  
        {/* transaction 3 */} 
       <div className='transactions'>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>freelance</div>
            <div className='description'>earned some</div>
          </div>
          <div className='right'>
            <div className='mon green'>+$500</div>
            <div className='date'>1204-2024 /13:59</div>
         </div>
        </div>
      </div>
      </main>
  )
}

export default App
