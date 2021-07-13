import { useState, useEffect } from "react";
import axios from 'axios'

const WhaleWatching = () => {

    // REMOVE THIS!!! for testing only
    const API_KEY = 'TSFXEWZAGR8GURWIU3NI542XA7IAHS37WC'

    const startUrl = 'https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress='
    const endUrl = '&page=1&offset=100&apikey='.concat(API_KEY);

    const [whaleData, setWhaleData] = useState([]);

    const [contractSearch, setContractSearch] = useState('');

    const fetchData = async () => {

        var url = startUrl + contractSearch + endUrl;
        var response;
        try {
            response = await axios.get(url);

            console.log("Response: ", response);
        } catch(err) {
            console.log("Error fetching whale data", err);
        }
        console.log(response);
        setWhaleData(response.data.result);
            
    }

    const printBal = (input) => {
        return input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return(
        <div>
            <h4>WHALE WATCHING</h4>
            <input type='text' value={contractSearch} style={{width:'40vw', textAlign:'center'}}
             onChange={(e) => setContractSearch(e.target.value)} placeholder='Enter BEP20 Smart Contract Address'/> <br />
            <button onClick={() => fetchData()} style={{width:'40vw', height:'10%'}} >Search</button>
            {whaleData.map((whale, i) => (
                
                <div key={i}>
                    <code style={{fontSize:'8px'}}>
                        Address: {whale.TokenHolderAddress}&nbsp;
                        {printBal(Math.floor(parseInt(whale.TokenHolderQuantity)/1000000000).toString())}

                    </code>
                </div>
                
            ))}
        </div>
    )

}; export default WhaleWatching