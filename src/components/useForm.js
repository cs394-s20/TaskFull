import React, { useState, useEffect } from 'react';


const useForm = (callback, validateForm) =>{
    const [values, setValues] = useState({ title: '', author: '', description: '', date: new Date(), items: [{name: "", quantity:""}], address: '', city: '', state: ''});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDateChange2 = e =>{
      console.log(e.target)
      setValues({...values, ['date']: e})
    }

    const handleTextChange = e =>{
      console.log(e)
        const {name,value} = e.target;
        setValues({
          ...values,
          [name]: value
        })
      }

    const handleStateChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
      };
    
    const handleItemsChange = event =>{
      const tempItems = [...values.items];
      console.log(tempItems);
      console.log(tempItems[event.target.dataset.id])
      console.log(tempItems[event.target.dataset.id][event.target.name])

      // tempItems[event.target.name] = event.target.value;
      tempItems[event.target.dataset.id][event.target.name] = event.target.value;
      setValues({...values, [event.target.name]: tempItems})
    }

    const addNewItem = () => {
      const tempItems = [...values.items, { name:'',quantity:''}]
      setValues(prevState => ({ ...prevState, items: tempItems}))
    };

    const deleteNewItem = index=> ()=>{
      if (values.items.length === 1){
        //error message
        return;
      }
      //  error message
      const tempItems = [...values.items].filter((s, sidx) => index !== sidx)
      console.log(tempItems);
      setValues(prevState=>({prevState, items: tempItems}))
    }

    // const getTotalItems = () => {
    //   return values.items.reduce((total, item) => {
    //     return total + Number(item.quantity);
    //   }, 0);
    // };

    const handleDropdownChange = (e) => {
        let newState = Object.assign({}, values);
        const statesArray = []
        e.map((state, i) => statesArray.push([i, state.name]))
        const entries = new Map(statesArray); 
        newState.requirements = Object.fromEntries(entries)
        setValues(newState);
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
        handleItemsChange,
        handleDateChange2,
        handleStateChange,
        addNewItem,
        deleteNewItem,
        handleSubmit,
        values,
        errors
      };
};

export default useForm;