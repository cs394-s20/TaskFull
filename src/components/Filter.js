import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';

// import produce from 'immer';

const options = [
    { value: 'physical', label: 'Physical' },
    { value: 'car', label: 'Car' },
    { value: 'pet', label: 'Pet' }
  ];

const Filter = (props) => {
  const [query, setQuery] = useState({
    reqs: options.map(o => o.value)
  })

  //   const nextState = produce(initialQuery, draftQuery => {
  //     draftQuery.reqs = newOptions.map(option => option.value)))
  //     setQuery(draftQuery)
  // })

  // function size_dict(d) { c = 0; for (i in d) ++c; return c }

  // const handleChange = (newOptions) => {
  //   const newReqs = newOptions;
  //   console.log(newReqs)
  //   if (newReqs != null){
  //     newReqs.map(option => option.value)
  //   }
  //   setQuery(newReqs);
  //   props.onChange(newReqs);
  // }

  return (
    <div>
      <div>Filter Tasks</div>
      <Select
      defaultValue={options}
      isMulti
      options={options}
      // onChange={handleChange}
      />
    </div>
  )
}

export default Filter;