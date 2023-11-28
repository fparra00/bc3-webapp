import React, { useState } from 'react';
import Select from 'react-select';

import 'bootstrap/dist/css/bootstrap.min.css';

interface Option {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  options: Option[];
  onDropdownChange: (selectedOption: Option | null) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, onDropdownChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption);
    onDropdownChange(selectedOption);
  };

  return (
    <div className="container">
      <div>
        <div className="col-md" style={{ width: '90%' }}>
          <Select<Option> options={options} onChange={handleChange} value={selectedOption} />
        </div>
        <div className="col-md"></div>
      </div>
    </div>
  );
};

export default CustomDropdown;
