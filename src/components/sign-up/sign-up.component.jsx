import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import "./sign-up.styles.scss";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    // console.log(e.target, name, value);
    // DYNAMIC OBJECT KEY!!!
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form autoComplete="on" onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
          autoComplete="on"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
          autoComplete="on"
        />
        <div className="buttons">
          <CustomButton type="submit">Sign Up</CustomButton>
        </div>
      </form>
    </div>
  );
};

// class SignUp extends Component {
//   constructor() {
//     super();
//     this.state = {
//       displayName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();

//     const { displayName, email, password, confirmPassword } = this.state;

//     if (password !== confirmPassword) {
//       alert("passwords don't match");
//       return;
//     }

//     try {
//       const { user } = await auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );

//       await createUserProfileDocument(user, { displayName });

//       console.log(this.state);
//       this.setState({
//         displayName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   handleChange = (e) => {
//     const { value, name } = e.target;
//     // console.log(e.target, name, value);
//     // DYNAMIC OBJECT KEY!!!
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { displayName, email, password, confirmPassword } = this.state;
//     return (
//       <div className="sign-up">
//         <h2 className="title">I do not have an account</h2>
//         <span>Sign up with your email and password</span>
//         <form
//           autoComplete="on"
//           onSubmit={this.handleSubmit}
//           className="sign-up-form"
//         >
//           <FormInput
//             type="text"
//             name="displayName"
//             value={displayName}
//             onChange={this.handleChange}
//             label="Display Name"
//             required
//           />
//           <FormInput
//             type="email"
//             name="email"
//             value={email}
//             onChange={this.handleChange}
//             label="Email"
//             required
//           />
//           <FormInput
//             type="password"
//             name="password"
//             value={password}
//             onChange={this.handleChange}
//             label="Password"
//             required
//             autoComplete="on"
//           />
//           <FormInput
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={this.handleChange}
//             label="Confirm Password"
//             required
//             autoComplete="on"
//           />
//           <div className="buttons">
//             <CustomButton type="submit">Sign Up</CustomButton>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

export default SignUp;
