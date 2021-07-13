import { useState } from 'react'
import { BsGraphUp } from 'react-icons/bs'
import axios from 'axios'

const UserPortfolio = () => {

    // REMOVE THIS!!! for testing only
    const API_KEY = 'TSFXEWZAGR8GURWIU3NI542XA7IAHS37WC'

    const [userPublicKey, setUserPublicKey] = useState('');

    const [userData, setUserData] = useState([]);

    var start = 'https://api.bscscan.com/api?module=account&action=tokentx&address=';
    var end = '&sort=asc&apikey='.concat(API_KEY);

    const fetchData = async () => {

        var url = start + userPublicKey + end;
        var response;
        try {
            response = await axios.get(url);

            console.log("Response: ", response);
        } catch(err) {
            console.log("Error fetching whale data", err);
        }
        console.log(response);
        setUserData([...response.data.result]);
    }

    const styles={
        textStyle:{
            fontSize:'calc(0.38rem + 1vw)',
            fontFamily:'monospace',
            marginLeft:'1vw',
            marginBottom:'0.25vh'
        },
        tokenContainer:{
            border:'1px solid gray',   
            width:'80vw', 
            height:'12vh',
            marginBottom:'1vh',
            textAlign:'left', 
            alignSelf:'center',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            cursor:'pointer'
        },
        contractStyle:{
            fontSize:'calc(0.3rem + 0.5vw)',
            fontFamily:'monospace',
            fontStyle:'oblique',
            alignSelf:'center'
        }
    }

    const printBal = (input) => {
        return input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const sortData = () => {
        var sortedData = [];
        var names = [];
        var count = 0;

        var data = {
            tokens:[],
            transactions:[]
        }

        for (var i = 0; i < userData.length; i++) {

            var name = userData[i].tokenName;
            var trx = {
                tokenName:name,
                from:userData[i].from,
                to:userData[i].to,
                timeStamp:userData[i].timestamp
            }
            var tName = {
                tokenName:name,
                contractAddress:userData[i].contractAddress
            }

            if (!names.includes(name)) {
                names.push(name);
                data.tokens.push(tName);
            }
            data.transactions.push(trx);
        }
        return data;
    }

    var data = sortData();

    return(
        <div>
            <h4>User Portfolio</h4>
            <input type='text' value={userPublicKey} style={{width:'40vw', textAlign:'center'}}
             onChange={(e) => setUserPublicKey(e.target.value)} placeholder='Enter BEP20 Receiving Address'/> <br />
            <button onClick={() => fetchData()} style={{width:'40vw', height:'10%', marginBottom:'7.5vh'}} >Search</button>
            {/*userData.map((data, i) => {
                var val = parseInt(data.value);
                var rVal = val/1000000;
                rVal = Math.floor(rVal);
                rVal = (rVal/1000).toString();
                return(
                <div key={i} style={{textAlign:'left', width:'60vw', alignSelf:'center'}}>
                    <code style={{fontSize:'1.75rem', fontFamily:'monospace'}}>{data.tokenName}</code><br />
                    <code style={styles.textStyle}>From: {data.from}<br />To: {data.to}</code><br />
                    <code style={styles.textStyle}>Amount of {data.tokenName}: {printBal(rVal)}</code><br />
                    <code style={styles.textStyle}>When: {data.timeStamp}</code>
                    <br /><br /><br /><br />
                </div>)
            })*/}
            {data.tokens.map((token, i) => {

                return(
                <div key={i} style={styles.tokenContainer}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <code style={{fontSize:'1.4rem', fontFamily:'monospace', marginLeft:'1vw'}}>{token.tokenName}</code>&nbsp;
                        <code style={styles.contractStyle}>({token.contractAddress})</code>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', marginTop:'1.5vh'}}>
                    <code style={styles.textStyle}>
                        Balance: 3,250,193,275 ($14,460)
                    </code>
                    <code style={styles.textStyle}>
                        Avg Cost: $0.0000000233
                    </code>
                    </div>
                    </div>
                    <div style={{alignSelf:'flex-end', marginRight:'1vw'}}>
                        {i**2 % 3 == 1 ? <BsGraphUp size='5rem' color='green'/> : <BsGraphUp size='5rem' color='red'/> }
                    </div>
                    </div>
                )
            })}
        </div>
    )


}; export default UserPortfolio