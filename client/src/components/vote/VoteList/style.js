export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.8rem',
    background: 'white',
    color: state.isSelected ? 'black' : 'gray',
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '0.8rem',
    fontFamily: ['sans-serif'],
  }),
  menu: provided => ({
    ...provided,
    fontSize: '0.8rem',
    color: '#838383',
    width: '140px',
  }),
  control: base => ({
    ...base,
    fontSize: '0.8rem',
    boxShadow: 'none',
    height: '40px',
    width: '140px',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#313131',
  }),
};
