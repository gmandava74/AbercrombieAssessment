
export function getData() {
    fetch('https://5dc588200bbd050014fb8ae1.mockapi.io/assessment')
        .then(response => response.json())
        .then(data => {
            generateList(data)
        });
}

export function inValidValidation(idVal) {
    var inValid = document.getElementById(idVal);
    if (inValid.style.display === "none") {
        inValid.style.display = "block";
    } else {
        inValid.style.display = "none";
    }
}

export function generateList(dataRows) {
    const unsortedList = document.getElementById("usersList");
    const unsortedListData =
    `<ul>
        {{#each dataRows}}
        <li>
            <div>
                <p> Name : {{this.name}} </p>
                <img src={{this.avatar}} alt='No Avatar'>
                <button type=button onclick='inValidValidation({{this.id}})'>More Details</button>
                <p id={{this.id}} style='display: none'> ID : {{this.id}} <br> Created At : {{this.createdAt}}</p>
            </div>
        </li>
        {{/each}}
    </ul>`;
    const template = Handlebars.compile(unsortedListData);
    unsortedList.innerHTML = template({ dataRows: dataRows });
}
