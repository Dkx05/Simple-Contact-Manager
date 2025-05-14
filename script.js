let contacts = [];

function addContact(name, phone) {
    contacts.push({ name: name.trim(), phone: phone.trim() });
    displayContacts(contacts);
}

function searchContact(keyword) {
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(keyword.toLowerCase().trim())
    );
}

// Modified displayContacts to add highlighting (only addition)
function displayContacts(contactArray, highlightTerm = '') {
    const list = document.getElementById("contactList");
    list.innerHTML = "";

    if (contactArray.length === 0) {
        list.innerHTML = "<p class='no-results'>No contacts found</p>";
        return;
    }

    contactArray.forEach(contact => {
        const card = document.createElement("div");
        card.className = "contact-card";

        const nameElem = document.createElement("div");
        nameElem.className = "contact-name";
        
        // Added highlighting logic (new code)
        if (highlightTerm) {
            const regex = new RegExp(highlightTerm, 'gi');
            const highlightedName = contact.name.replace(regex, 
                match => `<span class="highlight">${match}</span>`);
            nameElem.innerHTML = highlightedName;
        } else {
            nameElem.textContent = contact.name;
        }

        const phoneElem = document.createElement("div");
        phoneElem.className = "contact-phone";
        phoneElem.textContent = contact.phone;

        card.appendChild(nameElem);
        card.appendChild(phoneElem);

        list.appendChild(card);
    });
}

function handleAddContact() {
    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;

    if (name && phone) {
        addContact(name, phone);
        document.getElementById("nameInput").value = "";
        document.getElementById("phoneInput").value = "";
    } else {
        alert("Please enter both name and phone number.");
    }
}

// Modified handleSearch to pass highlight term (only addition)
function handleSearch() {
    const keyword = document.getElementById("searchInput").value;
    const results = searchContact(keyword);
    displayContacts(results, keyword);
}

document.addEventListener('DOMContentLoaded', function() {
    // Existing search icon code
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';
    searchIcon.style.cursor = 'pointer';
    
    const searchInput = document.getElementById('searchInput');
    searchInput.insertAdjacentElement('beforebegin', searchIcon);
    
    searchIcon.addEventListener('click', function() {
        searchInput.focus();
        handleSearch();
    });

    // NEW: Add search button
    const searchButton = document.createElement('button');
    searchButton.className = 'search-button';
    searchButton.textContent = 'Search';
    searchButton.onclick = handleSearch;
    
    // Insert search button after search input
    searchInput.insertAdjacentElement('afterend', searchButton);

    // NEW: Handle Enter key in search
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});































