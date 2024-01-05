document.addEventListener('DOMContentLoaded', function () {
    const formElementsContainer = document.getElementById('form-elements');
    const addElementBtn = document.getElementById('add-element');
    const generateFormBtn = document.getElementById('generate-form');

    addElementBtn.addEventListener('click', function () {
        addFormElement();
    });

    generateFormBtn.addEventListener('click', function () {
        generateForm();
    });

    function addFormElement() {
        const elementName = document.getElementById('elementName').value;
        const elementType = document.getElementById('elementType').value;
        const isRequired = document.querySelector('input[name="required"]:checked').value;

        const elementContainer = document.createElement('div');
        elementContainer.classList.add('form-element');

        const elementInfo = document.createElement('p');
        elementInfo.textContent = `${elementName}, Type: ${elementType}, Required: ${isRequired}`;

        formElementsContainer.appendChild(elementContainer);
        elementContainer.appendChild(elementInfo);
        

        // Add red star (*) to the label if the field is required
        if (isRequired === 'yes') {
            const label = document.createElement('label');
            label.textContent = `${elementName}*`;
            elementContainer.appendChild(label);
        }
    }

    function generateForm() {
        const formElements = document.querySelectorAll('.form-element p');
        let htmlCode = '<form>';
        formElements.forEach(elementInfo => {
            const [elementName, elementType, isRequired] = elementInfo.textContent.split(', ');
            const inputAttributes = getAttributesForElementType(elementType, isRequired.includes('yes'));
            htmlCode += `<label for="${elementName}">${elementName}${isRequired.includes('yes') ? '*' : ''}</label>`;
            htmlCode += `<input ${inputAttributes} /><br>`;
        });
        htmlCode += '<input type="submit" value="Submit"></form>';

        const generatedForm = document.createElement('div');
        generatedForm.innerHTML = htmlCode;

        formElementsContainer.appendChild(generatedForm);
    }

    function getAttributesForElementType(elementType, isRequired) {
        let attributes = `type="${elementType}" name="${elementType}"`;
        if (isRequired) {
            attributes += ' required';
        }

        if (elementType === 'email') {
            attributes += ' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"';
        } else if (elementType === 'password') {
            attributes += ' pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one numeric digit, one uppercase and one lowercase letter, and at least 8 characters"';
        }

        return attributes;
    }
});
