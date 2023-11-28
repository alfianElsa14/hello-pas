import { useDispatch } from 'react-redux';
import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from './actions';

const RegisterDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    // yearExperience: '',
    // practiceAt: '',
    price: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  console.log(inputs);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, phoneNumber } = inputs;
    if (!username || !email || !password || !phoneNumber) {
      alert('Semua field harus diisi');
      return;
    }

    if (password.length < 6) {
      alert('Password harus minimal 6 karakter');
      return;
    }

    dispatch(register(inputs));
    navigate('/login/doctor');
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1>Register Doctor</h1>
        <form onSubmit={handleFormSubmit}>
          <div className={classes.inputItem}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" value={inputs.username} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" value={inputs.email} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={inputs.password} onChange={handleInputChange} />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={inputs.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className={classes.inputItem}>
            <label htmlFor="yearExperience">Year Experience</label>
            <input
              id="yearExperience"
              name="yearExperience"
              type="number"
              value={inputs.yearExperience}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="practiceAt">Practice At</label>
            <input
              id="practiceAt"
              name="practiceAt"
              type="text"
              value={inputs.practiceAt}
              onChange={handleInputChange}
            />
          </div> */}
          <div className={classes.inputItem}>
            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="text" value={inputs.price} onChange={handleInputChange} />
          </div>
          <button type="submit" className={classes.buttonRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor;
