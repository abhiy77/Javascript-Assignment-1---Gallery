let feedbackForm = document.getElementById('feedbackForm');
let feedbackFormBtn = document.getElementById('feedbackFormBtn');

let alertFullName = document.getElementById('alertFullName');
let alertEmail = document.getElementById('alertEmail');
let submitSuccessAlert = document.getElementById('submitSuccessAlert');

const port = 8001;

// feedBackForm.addEventListener('click',(event) => {
//     event.preventDefault();
// });

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let userFullName = document.forms['feedbackForm']['userFullName'].value.trim();
    let userEmail = document.forms['feedbackForm']['userEmail'].value.trim();
    let userContactNo = document.forms['feedbackForm']['userContactNo'].value.trim();
    let userFeedback = document.forms['feedbackForm']['userFeedback'].value.trim();

    if(userFullName.length == 0){
        alertFullName.style.display = '';
        return false;
    }
    alertFullName.style.display = 'none';

    if(!validateEmail(userEmail)){
        alertEmail.style.display = '';
        return false;
    }

    alertEmail.style.display = 'none';

    const data = {
        fullName : userFullName,
        email : userEmail,
        contactNo : userContactNo,
        feedback : userFeedback
    };

    document.forms['feedbackForm']['userFullName'].value = "";
    document.forms['feedbackForm']['userEmail'].value = "";
    document.forms['feedbackForm']['userContactNo'].value = "";
    document.forms['feedbackForm']['userFeedback'].value = "";

    const request = async () => {
        const response = await fetch('http://localhost:' + port + '/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          submitSuccessAlert.style.display = "";
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    request();

    

});