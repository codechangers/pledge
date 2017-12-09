/* eslint-disable */
document.querySelectorAll('td').forEach(el => {
  el.onclick = function () {
    // grab id and name from clicked row and place it into the hidden form field
    const schoolId = el.parentElement.firstChild.textContent;
    const schoolName = el.parentElement.childNodes[1].textContent;
    document.querySelector('#id').value = schoolId;
    document.querySelector('#name').value = schoolName;
    document.querySelector('h3').textContent = 'Editing School';
  }
});
