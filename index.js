function submitData(){
    let firstNameDom = document.querySelector('input[name=firstname]');
    let lastNameDom = document.querySelector('input[name=lastname]');
    let ageDom = document.querySelector('input[name=age]');
    let genderDom = document.querySelector('input[name=gender]:checked');
    let interestDoms = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDom = document.querySelector('textarea[name=description]');

    let interest = '';
    for(let i = 0; i < interestDoms.length; i++){
        interest += interestDoms[i].value 
        if(i != interestDoms.length - 1){
            interest += ',';
        }
    }
    
    let userData = {
        firstname: firstNameDom.value,
        lastname: lastNameDom.value,
        age: ageDom.value,
        gender: genderDom.value,
        interest: interest,
        description: descriptionDom.value}
    console.log('submitData',userData);
}1