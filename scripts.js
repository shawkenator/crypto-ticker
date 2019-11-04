let currentpage = 1;
let pagetotal = 12;
let coindata = [];
let alphaSort = false;
let priceSort = false;
let change24Ssort = false;

function prevPage() {
    if (currentpage > 1) {
        currentpage--;
        changePage(currentpage);
    }
}

function nextPage() {
    if (currentpage < pageNum()) {
        currentpage++;
        changePage(currentpage);
    }
    if (currentpage == pageNum()) {
        changePage(currentpage);
    }
}

function pageNum() {
    return Math.ceil(coindata.length / pagetotal);
}

function changePercentageSort() {
    const change24Icon = document.getElementById("change24Icon");
    change24Ssort = !change24Ssort
    currentpage = 1;
    if (change24Ssort == true) {
        coindata.sort(function(a, b){
            return b.price_change_percentage_24h - a.price_change_percentage_24h
        });
        change24Icon.className = "fas fa-chevron-down";
    } else {
        coindata.sort(function(a, b){
            return a.price_change_percentage_24h - b.price_change_percentage_24h
        });
        change24Icon.className = "fas fa-chevron-up";
    }
    changePage(currentpage);
}

function changePriceSort() {
    const priceIcon = document.getElementById("priceIcon");
    priceSort = !priceSort;
    currentpage = 1;
    if (priceSort == true) {
        coindata.sort(function(a, b){
            return b.current_price - a.current_price
        });
        priceIcon.className = "fas fa-chevron-down";
    } else {
        coindata.sort(function(a, b){
            return a.current_price - b.current_price
        });
        priceIcon.className = "fas fa-chevron-up";
    }
    changePage(currentpage);
}

function changeAlphaSort() {
    const alphaIcon = document.getElementById("alphaIcon");
    alphaSort = !alphaSort;
    currentpage = 1;
    if (alphaSort == true) {
        coindata.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        alphaIcon.className = "fas fa-chevron-down";
    } else {
        coindata.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
        });
        alphaIcon.className = "fas fa-chevron-up";
    }
    changePage(currentpage);
}

function refreshCall() {
    fetch(url+marketsParam)
    .then((resp) => resp.json())
    .then(function(data) {
        coindata = data;
        changePage(1);
    })
        .catch(function(error) {
        console.log(JSON.stringify(error));
    });   
}
function changePage(page) {

    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const coin_table = document.getElementById("coinList");
    const page_el = document.getElementById("page");
    const page_total = document.getElementById("totalpages");
    const pageNumVar = pageNum();

    if (page < 1) {
        page = 1
    };
    if (page > pageNumVar) {
        page = pageNumVar
    };    

    page_el.innerHTML = page;
    page_total.innerHTML = pageNumVar;

    if (page == pageNumVar) {
        nextButton.style.visibility = "hidden";
    } else {
        nextButton.style.visibility = "visible";
    }
    
    coin_table.innerHTML = "";
    for (var i = (page-1) * pagetotal; i < (page * pagetotal); i++) {
        if(i >= coindata.length) {
            return
        }
        coin_table.innerHTML += "<div class='coin'><span class='index'> #" + ([i+1]) + "</span><span>" + coindata[i].name + "</span>" + "<img src='" + coindata[i].image + "' class='logo'><span class='price'><label>Current Price:</label> $" + coindata[i].current_price + "</span><span class='change'><label>% 24h Change:</label>" + coindata[i].price_change_percentage_24h + "%</span></div>";
    }

    if (page == 1) {
        prevButton.style.visibility = "hidden";
    } else {
        prevButton.style.visibility = "visible";
    }
        
}

const url = 'https://api.coingecko.com/api/v3/coins/';
const marketsParam = 'markets?vs_currency=usd'
fetch(url+marketsParam)
.then((resp) => resp.json())
.then(function(data) {
    coindata = data;
    changePage(0);
})
    .catch(function(error) {
    console.log(JSON.stringify(error));
});   
