import { useEffect, useState } from 'react';
import web3 from 'web3';

const LPTracker = () => {

    const uselessAddr = '0x2cd2664Ce5639e46c6a3125257361e01d0213657';

    const bnb = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

    const factory = '0xBCfCcbde45cE874adCB698cC183deBcF17952812';

    const pool_hash_code = '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66';

    const useless_pcs_v2_addr = '0x08a6cd8a2e49e3411d13f9364647e1f2ee2c6380';
    // maybe it's 0xff ?? maybe its just ff .... i've tried them all
    const hashedFF = web3.utils.toHex('ff');

    const [lpAddr, setLpAddr] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [contractAddr, setContractAddr] = useState('');

    const hex = (input) => {
        var n = input.split("")
        .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");
        return n;
    }

    const calculateLP = () => {

        try {

            var pair;
            if (contractAddr.length > 20) {
                pair = web3.utils.soliditySha3(
                    {t: 'address', v: bnb},
                    {t: 'address', v: contractAddr},
                );
            } else {
                pair = web3.utils.soliditySha3(
                    {t: 'address', v: bnb},
                    {t: 'address', v: uselessAddr},
                );
            }
            
            var pool = web3.utils.soliditySha3(
                    {t: 'string', v: hashedFF},
                    {t: 'address', v: factory},
                    {t: 'string', v: pair},
                    {t: 'string', v: pool_hash_code},
            );
            console.log(pool, ' compared to: ', useless_pcs_v2_addr);
            setLpAddr(pool);
        } catch(err) {
            console.log(err);
            setErrorMessage(err.message);
        }
    }

    useEffect(() => {
        calculateLP();
    }, [])

    return(
        <div>
            <h4>
            LP Tracker
            </h4>
            <input type='text' value={contractAddr} style={{width:'40vw', textAlign:'center'}}
             onChange={(e) => setContractAddr(e.target.value)} placeholder='Enter BEP20 Contract Address'/> <br />
            <button onClick={() => calculateLP()} style={{width:'40vw', height:'10%', marginBottom:'7.5vh'}} >Search</button>
            <br />
            { lpAddr.length > 0 ? 
            <div style={{textAlign:'left', marginLeft:'5vw'}}>
            <code style={{fontSize:'11px'}}>
                Hashing Useless Contract Address: {uselessAddr}<br />
                With BNB Address: {bnb}<br />
                USELESS Liquidity Pool: {useless_pcs_v2_addr}<br />
                Output&nbsp; Liquidity Pool: 0x{lpAddr.substring(Math.max(0,lpAddr.length - 40), lpAddr.length)}<br />
                Full Hashed-LP Output: {lpAddr}<br />
            </code>
            </div>
            :
            <></>
            }
            { errorMessage.length > 0 ? 
                <code style={{fontSize:'14px', fontFamily:'monospace', color:'red'}}>
                    Error: {errorMessage}
                </code>
                :
                <></>
            }
        </div>
        
    )

}; export default LPTracker