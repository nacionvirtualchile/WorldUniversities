//I think is a good idea to save the info when I do a FETCH and reuse it whenever the user chooses a country.
// this will avoid create a new fecth on every click (thinking is a big list of data)
// disadventage: is not info in real time, but the info would update when the user load the page again.

let masterList;

// funtion to obtain a list of uniques countries order by name
async function getCountries() {
    const response = await fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json');
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        masterList = data;

        //To create a list just with the countries avoiding the rest of info
        let countries = [];
        data.forEach(element => {
          countries.push(element.country); 
        });

        //send the new list to a function to obtain a list of uniques countries order by name
        SortListOfCountries = reduceAndSortCountries(countries);

        //send the sort list of countries to a function to displayfill the select element
        DisplaySelectInfo(SortListOfCountries);
        
    }
    

}


function reduceAndSortCountries(ListOfCountries) 
{
    //to obtain uniques countries
    uniqueData = [...new Set(ListOfCountries)];

    //to obtain sort list by name
    uniqueData = uniqueData.sort();
    console.log(uniqueData);
    return uniqueData;
}



function DisplaySelectInfo(SortListOfCountries)
{
  const Select_1 = document.getElementById("selectCountry");

  //to put in the Drop Down list
  SortListOfCountries.forEach(element => {

    const option = document.createElement("option");
    option.innerHTML = element;
    option.value = element;

    Select_1.appendChild(option);        

  });

}


function selectByCountry(){
  const Div_1 = document.getElementById("universities");

  reset ();
  //to put in the Drop Down list
  masterList.forEach(element => { 
    if (element.country == selectCountry.value) {
        const article = document.createElement("article");

        const h3 = document.createElement("h3");
        h3.innerHTML = element.name;
        const h4 = document.createElement("h4");
        h4.innerText = element.country;
        const url = document.createElement("a");
        url.innerText = element.web_pages[0];
        url.setAttribute("href",element.web_pages[0]);
    
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(url);
    
        Div_1.appendChild(article);
    }




  });

}


function reset (){
  const Div_1 = document.getElementById("universities");
  Div_1.innerHTML = "";
}

const selectCountry = document.getElementById("selectCountry");
selectCountry.addEventListener("click", selectByCountry);




getCountries();