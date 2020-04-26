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

    // if (Object.keys(values.requirements).length===0){
    //     errors.requirements = "Requirements are required"
    // }

    if (!values.address || !values.city || !values.state || (!values.address && !values.city && !values.state)){
        errors.address = "Address is required"
    }
    return errors;
}