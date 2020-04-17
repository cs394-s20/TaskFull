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

  const handleChange = (newOptions) => {
    //const newReqs = [...query];
    query.reqs.map(option => option.value)
    props.onChange(query)
  }

  return (
    <div>
      <div>Filter Tasks</div>
      <Select
      defaultValue={options}
      isMulti
      options={options}
      onChange={() => {handleChange(query, options); props.handleMultiFilter(props, options)}}
      />
    </div>
  )
}

export default Filter;