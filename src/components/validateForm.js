export default function validateForm(values) {
    let errors={};
    
    if (!values.title){
        errors.title = "Title is required"
    }

    if (!values.author){
        errors.author = "Name is required"
    }

    if (!values.description){
        errors.description = "Description is required"
    }

    if (!values.address && values.city && values.state){
        errors.address = "Address is required"
    }

    if (values.address && !values.city && !values.state){
        errors.address = "City and State are required"
    } 

    if (!values.address && values.city && !values.state){
        errors.address = "Address and State are required"
    } 

    if (!values.address && !values.city && values.state){
        errors.address = "Address and City are required"
    } 

    if(!values.city && values.address && values.state){
        errors.address = "City is required"
    }

    if( !values.state && values.city && values.address){
        errors.address = "State is required"
    }

    if ((!values.address && !values.city && !values.state)){
        errors.address = "Address, City, and State are required"
    }

    return errors;
}