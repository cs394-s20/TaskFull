import React, { useState, useEffect } from 'react';


const useForm = (callback, validateForm) =>{
    const [values, setValues] = useState({ title: '', author: '', description: '', requirements: {}, address: '', city: '', state: ''});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTextChange = e =>{
        const {name,value} = e.target;
        setValues({
          ...values,
          [name]: value
        })
      }
    

    const handleDropdownChange = (e) => {
        let newState = Object.assign({}, values);
        const requirementsArray = []
        e.map((req, i) => requirementsArray.push([i, req.value]))
        const entries = new Map(requirementsArray); 
        newState.requirements = Object.fromEntries(entries)
        setValues(newState);
        console.log(values);
    }

      const handleSubmit = e =>{
        e.preventDefault();
        setErrors(validateForm(values));
        setIsSubmitting(true);
      }

      useEffect(()=>{
          // check to see if there are errors
          if (Object.keys(errors).length === 0 && isSubmitting){
              callback();
           
          }
          // call our callback function
      }, [errors]);

      return {
        handleTextChange,
        handleDropdownChange,
        handleSubmit,
        values,
        errors
      };
};

export default useForm;