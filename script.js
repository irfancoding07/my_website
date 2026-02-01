
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            const alertBox = document.getElementById("alert");
            alertBox.classList.remove("hidden");

            setTimeout(() => {
                alertBox.classList.add("hidden");
            }, 1500);
        },
        () => {
            alert("clipboard copying failed");
        }
    );
}

const deletepassword = (websiteName) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);

    let arrupdated = arr.filter(e => e.website !== websiteName);
    localStorage.setItem("passwords", JSON.stringify(arrupdated));

    alert(`Successfully deleted ${websiteName}'s password`);
    Showpasswords();
};


const Showpasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");

    if (data === null) {
        tb.innerHTML = `<tr><td colspan="4">No Data To Show</td></tr>`;
        return;
    }

    tb.innerHTML = `
    <tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`;

    let arr = JSON.parse(data);
    let str = "";

    arr.forEach((element) => {
    str += `
    <tr>
        <td>${element.website}
            <img onclick="copyText('${element.website}')" src="copy.svg" width="20">
        </td>
        <td>${element.username}
            <img onclick="copyText('${element.username}')" src="copy.svg" width="20">
        </td>
        <td>${element.password}
            <img onclick="copyText('${element.password}')" src="copy.svg" width="20">
        </td>
        <td>
            <button class="btnsm" onclick="deletepassword('${element.website}')">Delete</button>
        </td>
    </tr>`;
});


    tb.innerHTML += str;

    website.value = "";
    username.value = "";
    passwordInput.value = "";
};

console.log("working");
let btn = document.querySelector(".btn");
let username = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let website = document.querySelector("#website");


btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Clicked....");

    console.log(username.value, passwordInput.value);

    let storedData = localStorage.getItem("passwords");
    console.log(storedData)

    if (storedData === null) {
        let json = [];
        json.push({
            website: website.value,
            username: username.value,
            password: passwordInput.value
        });

        localStorage.setItem("passwords", JSON.stringify(json));
        alert("Password saved");
    } else {
        let json = JSON.parse(storedData);

        json.push({
            website: website.value,
            username: username.value,
            password: passwordInput.value
        });

        localStorage.setItem("passwords", JSON.stringify(json));
        alert("Password saved");
    }
    Showpasswords()
});
