export default function requiredValidation(values) {
    const validate = Object.keys(values.fields)
    let error = {};

    validate.forEach(item => {
        if (values.fields[item].required && values.fields[item].value === '')
            error[item] = `*Required`
        // error[item] = `${item} is Required`
        else if (values.fields[item].hasOwnProperty('validate')) {
            const regX = new RegExp(values.fields[item].validate.pattern);
            if (values.fields[item].value) {
                if (!regX.test(values.fields[item].value))
                    if (values.fields[item].hasOwnProperty('description')) {
                        error[item] = values.fields[item].description
                    }
                    else {
                        error[item] = `${item} is Not Valid`
                    }
            }
        }


    })
    console.log(error)
    return error
}