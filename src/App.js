import { useState } from 'react';
import './App.css';

function calcDate(date1, date2){
  const dt_date1 = new Date(date1);
  const dt_date2= new Date(date2);
  var date1 =dt_date1.getTime() + 42*24*3600*1000;
  var date2 = dt_date2.getTime();
  
  var calc;
  if (date1 > date2){
      calc = new Date(date1 - date2) ;
  }else{
      calc = new Date(date2 - date1) ;
  }
  var calcFormatTmp = calc.getDate() + '-' + (calc.getMonth()+1)+ '-'+calc.getFullYear();
  var calcFormat = calcFormatTmp.split("-");
  var days_passed = parseInt(Math.abs(calcFormat[0]) - 1);
  var months_passed = parseInt(Math.abs(calcFormat[1]) - 1);
  var years_passed = parseInt(Math.abs(calcFormat[2] -   1970));
  
  const yrsTxt =["yıl"];
  const mnthsTxt = ["ay"];
  const daysTxt = ["gün"]; 
  
  var total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;
  
  const result = (years_passed+ ' '+ yrsTxt[0] + ', ') + 
  (months_passed+ ' ' + mnthsTxt[0] + ', ') +
  (days_passed+ ' ' + daysTxt[0]);
  
  const retval = {
      "total_days" : Math.round(total_days),
      "result" :  result
  }
  return retval;
}

function App() {
  const [ getText, setText ] = useState("");
  const [ currentDate, setCurrentDate ] = useState("");
  const [ getBirthday, setBirthday ] = useState("");
  const [ getUserDay, setDay ] = useState(0);
  const [ getUserMonth, setMonth ] = useState(0);
  const [ getUserYear, setYear ] = useState(0);

  const getAge = () => {
    let newDate = new Date()
    setCurrentDate(`Güncel Tarih: ${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`);

    const lastDate = calcDate(`${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`, `${parseInt(getUserMonth)}-${parseInt(getUserDay)}-${parseInt(getUserYear)}`)

    const birthDate = calcDate(`${newDate.getMonth()}-${newDate.getDay()}-${newDate.getFullYear()}`, `${parseInt(getUserMonth)}-${parseInt(getUserDay)}-${newDate.getFullYear()}`)
    setBirthday(`Doğum gününüze son ${birthDate["result"].split(", ")[1]}, ${birthDate["result"].split(", ")[2]} kaldı!`)

    console.log(lastDate)
    setText(`${lastDate["result"]} yaşadınız, güncel yaşınız ${lastDate["result"].split(", ")[0].split(" yıl")[0]}`)
  }

  return (
    <div className='md:container md:mx-auto flex h-screen'>
      <div className='rounded-xl w-3/5 h-auto drop-shadow bg-slate-100 m-auto p-8'>
        <h1 className='text-xl font-semibold'>Yaş Hesaplama Formu</h1>
        <p className='text-base mt-2 text-slate-700'>Bu forum ile şuanki yaşınızı öğrenebilirsiniz</p>
        <h2 className='mt-4 font-semibold text-md text-indigo-500'>Yaş Nasıl Hesaplanır?</h2>
        <p className='text-base mt-2 text-slate-700'>Türkiye saati ile şu anda içinde bulunduğumuz günle doğum tarihiniz arasındaki tam yıl sayısı hesaplanır. Bu sayı doldurduğunuz yaşı göstermektedir. Gün almaya başladığınız yaş ise bunun 1 fazlasıdır. Örneğin, yukarıdaki hesaplama aracını kullanarak yapmış olduğunuz işlemde 29 yaşında olduğunuz belirtilirse, bu 30 yaşından gün almaya başladığınız manasına gelir.</p>
        <h2 className='mt-4 font-semibold text-md text-indigo-500'>Doğum Günüme Kaç Gün Kaldı?</h2>
        <p className='text-base mt-2 text-slate-700'>Doğum gününe kalan gün sayısını tespit edebilmek için bugünün tarihi ile arasındaki gün sayısı tespit edilmelidir. Hesaplama sonuçlarında bu sorunun yanıtını bulabilirsiniz.</p>
        <div className='mt-4 w-auto flex flex-wrap'>
          <select onChange={(e) => setDay(e.target.value)} className="block w-20 mr-2 bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-0 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Gün</option>
            {
              [...Array(31)].map((e, i) => <option key={i}>{i + 1}</option>)
            }
          </select>
          <select onChange={(e) => setMonth(e.target.value)} className="block w-20 mr-2 bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-0 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Ay</option>
            {
              [...Array(12)].map((e, i) => <option key={i}>{i + 1}</option>)
            }
          </select>
          <select onChange={(e) => setYear(e.target.value)} className="block w-20 mr-2 bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-0 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Yıl</option>
            {
              [...Array(100)].map((e, i) => <option key={i}>{i + 1923}</option>)
            }
          </select>
          <button className='rounded-md bg-indigo-500 px-4 py-2 text-white drop-shadow-md font-medium hover:bg-indigo-600 active:bg-indigo-400 transition-all' onClick={() => getAge()}>Hesapla</button>
        </div>
        <p className='mt-4'>{currentDate}</p>
        <p className='mt-2 text-lg font-medium'>{getText}</p>
        <p className='mt-2 text-lg font-medium text-indigo-600'>{getBirthday}</p>
      </div>
    </div>
  );
}

export default App;
