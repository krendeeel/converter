const rates = [];
const enter = document.querySelector('#input_1');
const resualt = document.querySelector('#input_2')
const valuteList_1 = document.querySelector('#select_1')
const valuteList_2 = document.querySelector('#select_2')


const addOption  = (oListbox, text, value) => {

  let newOption = document.createElement('option');
  newOption.appendChild(document.createTextNode(text));
  newOption.setAttribute('value', value);
  oListbox.appendChild(newOption);

}

const addValutesList = (data) => {
    
    let select_1 = document.querySelector('#select_1');
    let select_2 = document.querySelector('#select_2');
    
    for(let key in data){        
        addOption(select_1, data[key].CharCode, data[key].CharCode);
        addOption(select_2, data[key].CharCode, data[key].CharCode); 
        rates.push({
            'CharCode': data[key].CharCode,
            'Nominal': data[key].Nominal,
            'Previous': data[key].Previous,
            'Value': data[key].Value
        });          
    }

    setElementValue('EUR','[data_value="EUR"]');
    setElementValue('USD', '[data_value="USD"]');
    addColorItem(rates,'[data_value="USD"]','USD');
    addColorItem(rates,'[data_value="EUR"]','EUR');
    Covertion(valuteList_1);
    Covertion(valuteList_2);
    Covertion(enter);
}

const showError = () => {
    alert('Что-то пошло не так!');
}

const getRates = (url, error) => {
    fetch(url).then(response => {
        return (response.ok ? response.json() : error);
    }).then(data => addValutesList(data.Valute));   
    
}

const setElementValue = (ValuteName, selector) => {    
    const value = searchValue(ValuteName);
    const elem = document.querySelector(selector);
    elem.textContent = value;     
}

const searchValue = (valute) => {
    if(valute == "RUB") return 1;
    const index = rates.findIndex(item =>{
        if(item.CharCode == valute) return true;
    });

    return ((rates[index].Value)/(rates[index].Nominal)).toFixed(2);
}

const Covertion = (element) => {
    element.oninput = () => {
        const valuteName_1 = searchValue(valuteList_1.value);
        const valuteName_2 = searchValue(valuteList_2.value);        
        resualt.value = ((valuteName_1 * enter.value)/(valuteName_2)).toFixed(4);
    }
}

const addColorItem = (array, selector, Valute) => {
    const index = array.findIndex(item => {
        if(item.Valute = Valute) return true;
    });
    (array[index].Value > array[index].Previous) ? document.querySelector(selector).classList.add('top') :
                                                 document.querySelector(selector).classList.add('bottom');
}

getRates('https://www.cbr-xml-daily.ru/daily_json.js', showError);



