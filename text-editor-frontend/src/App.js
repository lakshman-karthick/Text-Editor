import { useEffect,useState } from 'react';
import './App.css';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';
import Pusher from 'pusher-js'
import axios from 'axios';
function App() {
  const [messagesU,setMessageU] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:9000/texts').then((res)=>{
      console.log(res.data)
      setMessageU(res.data)
    }).catch(err=>{
      console.log(err)
      console.log('ERROR')
    })
  },[]);

  useEffect(()=>{
    var pusher = new Pusher('434e9cbfcbea42395b7d', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessageU([...messagesU,data])
    });

    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  },[messagesU]);
  return (
    <div className="App">
       <div class="row">
        <div class="col-lg-3"></div>
          <div class="col-lg-6">
            <Titlebar/>
            <Toolbar messagesU = {messagesU}/>
          </div>
        <div class="col-lg-3"></div>
       </div>
       
        
    </div>
  );
}

export default App;


// export default function MyComponent() {
//   const [myState, setMyState] = useState(false);

//   function handleKeyPress(event) {
//     if (event.key === "Enter") {
//       setMyState(!myState);
//     }
//   }

//   return (
//     <div tabIndex="0" onKeyPress={handleKeyPress}>
//       {myState ? "State is true" : "State is false"}
//     </div>
//   );
//}

