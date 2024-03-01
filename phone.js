

const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll)

}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    console.log(phones)
    // step 1 .. creat a element
    const phoneContainer = document.getElementById('phone-container');
    // clear  phone container cards before addting new cards
    phoneContainer.textContent = '';
    // display show all button if there are more than

    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all ',isShowAll)

    // display only first 10 fhones if not show all 
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }
    phones.forEach(phone => {
        console.log(phone);
        // step 2 .. create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-base-100 p-4 shadow-xl`;
        // step 3 set innet html
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name
            }</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button onclick='handaleShowDetails("${phone.slug}")' class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `
        // step 4 AppendChild
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spiner 
    toggleLoadingSpiner(false);

}

// handle show details click 

const handaleShowDetails = async (id) => {
    console.log('click me ', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = res.json();
    const phone = data.data;
    showModalDetailas(phone)
}

// show modal detailas

const showModalDetailas = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.phone_name;

    const phoneContainer = document.getElementById('phone-detail-container');
    phoneContainer.innerHTML = `
    <img src="${phone.image}" />
    `

    // 
    show_details_modal.showModal()


}
// handle search button 

const handleSearch = (isShowAll) => {
    toggleLoadingSpiner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpiner = (isLoading) => {
    const loadingSpiner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpiner.classList.remove('hidden')
    }
    else {

        loadingSpiner.classList.add('hidden')
    }

}

const handaleShowAll = () => {
    handleSearch(true);

}
loadPhone();

