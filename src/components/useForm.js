import React, { useState, useEffect } from 'react';


const useForm = (callback, validateForm) =>{
    const [values, setValues] = useState({ title: '', author: '', description: '', requirements: {}, address: '', city: '', state: ''});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTextChange = e =>{
        //console.log(e.target)
        
        const {name,value} = e.target;
        //console.log(name);
        //console.log(value);
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
      // if (!e) return;
    //   const requirementsArray = []
    //   e.map((req, i) => requirementsArray.push([i, req.value]))
    //   const entries = new Map(requirementsArray); 
    //   setValues(Object.fromEntries(entries));
    }

    // const handleSelectChange = name => value => {
      //const {name,value} = e.target;
      // console.log(e);
      //if (!e) return;
      // const requirementsArray = []
      //e.map((req, i) => requirementsArray.push([i, req.value]))
      //const entries = new Map(requirementsArray); 
    //   console.log(requirementsArray);
    //   console.log(entries);
    //   console.log(Object.fromEntries(entries));
      
    //   setValues({
    //       ...values,
    //       [values.requirements]: Object.fromEntries(entries)});
      //console.log(values.requirements);

//         setValues({
//           ...values,
//           [name]: value
//     });
// }
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