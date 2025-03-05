import Select from 'react-select';

const options = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: `Item ${i + 1}`
}));

const DropdownComponent = () => {
    return <Select options={options} isSearchable />;
};

export default DropdownComponent;
