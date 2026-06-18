const dateElement = document.getElementById("date");
const entriesDiv = document.getElementById("entries");
const countButton = document.getElementById("entryCount");

const today = new Date();

dateElement.innerHTML =
today.toLocaleDateString("en-US",{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
});

loadEntries();

function saveEntry(){

    const text = document.getElementById("journalText").value;

    if(text.trim()===""){
        alert("Write something first!");
        return;
    }

    let entries =
    JSON.parse(localStorage.getItem("journalEntries")) || [];

    entries.unshift({
        content:text,
        time:new Date().toLocaleString()
    });

    localStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
    );

    document.getElementById("journalText").value="";

    loadEntries();
}

function loadEntries(){

    let entries =
    JSON.parse(localStorage.getItem("journalEntries")) || [];

    entriesDiv.innerHTML="";

    entries.forEach((entry,index)=>{

        const div=document.createElement("div");

        div.classList.add("entry");

        div.innerHTML=`
            <p>${entry.content}</p>
            <div class="entry-time">
                📅 ${entry.time}
            </div>
            <button class="delete-btn"
            onclick="deleteEntry(${index})">
            Delete
            </button>
        `;

        entriesDiv.appendChild(div);
    });

    countButton.innerText =
    `📚 Entries: ${entries.length}`;
}

function deleteEntry(index){

    let entries =
    JSON.parse(localStorage.getItem("journalEntries")) || [];

    entries.splice(index,1);

    localStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
    );

    loadEntries();
}

function clearAll(){

    if(confirm("Delete all journal entries?")){

        localStorage.removeItem("journalEntries");

        loadEntries();
    }
}