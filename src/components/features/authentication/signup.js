import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import AuthenticationHeader from "./authenticationHeader";
import { Typography } from "@mui/material";
import GoogleButton from "../../../common/component/googleButton";
import FacebookButton from "../../../common/component/facebookButton";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../common/validation/authenticationSchemas";
import {
	signUp,
	verifyEmail,
	verifyOTP,
} from "../../../store/authentication/authenticationAction";
import { AuthenticationStore } from "../../../store/authentication/authenticationStore";
import AuthButton from "../../../common/component/authButton";
import VerifyEmailModal from "../modals/verifyEmailModal";
import VerifyOTPModal from "../modals/verifyOTPModal";

const useStyle = makeStyles((theme) => ({
	formInputControl: {
		display: "flex",
		flexDirection: "column",
		marginBottom: "10px",
	},
	form: {
		width: "500px",
		margin: "auto",
		boxShadow: "rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px",
		padding: "30px",
	},

	formFooter: {
		marginTop: "10px",
		fontSize: "16px",
		"& a": {
			color: "#5072bd",
			textDecoration: "none",
		},
	},

	formInputLabel: {},
}));

function SignUp() {
	const classes = useStyle();

	//===================== Validation resolver
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(signUpSchema),
	});
	// ================== Context
	const { authenticationDispatch } = useContext(AuthenticationStore);

	// =============== User Defined State
	const [isEmailModalOpen, setEmailModal] = useState(false);
	const [isVerificationCodeSend, setVerificationModal] = useState(false);
	const [facebookResponse, setFacebookResponse] = useState({});
	const [userEmail, setUserEmail] = useState("");

	const creatSignUpSchema = (data, type) => {
		return {
			First_Name: data?.First_Name,
			Last_Name: data?.Last_Name,
			Email: data?.Email,
			Password: data?.Password,
			Phone_Number: data?.Phone_Number,
			Authentication_Type: type,
			Token: data?.tokenId || data?.accessToken,
			Facebook_ID: data?.userID,
		};
	};

	const handleEmailModal = () => {
		setEmailModal(false);
	};

	const handleOTPModal = () => {
		setVerificationModal(false);
	};

	const handeleSendVeificationCode = async (email) => {
		if ((email, facebookResponse)) {
			setUserEmail(email);
			const USER_DATA = {
				Email: email,
				Facebook_ID: facebookResponse?.userID,
			};
			const response = await verifyEmail(USER_DATA, authenticationDispatch);
			if (response?.Data) {
				setEmailModal(false);
				setVerificationModal(true);
			}
		}
	};
	const handeleSubmitVeificationCode = async (otp) => {
		if (otp) {
			const USER_DATA = {
				Authentication_Type: "FACE_BOOK",
				Token: facebookResponse.accessToken,
				Facebook_ID: facebookResponse.userID,
				Email: userEmail,
				OTP: otp,
			};
			const response = await verifyOTP(USER_DATA, authenticationDispatch);
			if (response?.Message) setVerificationModal(false);
		}
	};

	const responseFacebook = (response) => {
		if (response?.email) {
			signUp(creatSignUpSchema(response, "FACE_BOOK"), authenticationDispatch);
		} else {
			setFacebookResponse(response);
			setEmailModal(true);
		}
	};

	const responseGoogle = (response) => {
		signUp(creatSignUpSchema(response, "GOOGLE"), authenticationDispatch);
	};

	const handleOnSubmit = (data) => {
		signUp(creatSignUpSchema(data, "MANUAL"), authenticationDispatch);
	};

	return (
		<React.Fragment>
			<AuthenticationHeader title="Create your account" />
			<form
				className={classes.form}
				onSubmit={handleSubmit((data) => handleOnSubmit(data))}
				noValidate
			>
				<Box className={classes.formInputControl}>
					<label className={classes.formInputLabel}>First Name</label>
					<TextField
						type="text"
						required
						size="small"
						name="First_Name"
						{...register("First_Name")}
						error={errors?.First_Name}
						helperText={errors?.First_Name?.message}
					/>
				</Box>
				<Box className={classes.formInputControl}>
					<label className={classes.formInputLabel}>Last Name</label>
					<TextField
						type="text"
						required
						size="small"
						name="Last_Name"
						{...register("Last_Name")}
						error={errors?.Last_Name}
						helperText={errors?.Last_Name?.message}
					/>
				</Box>
				<Box className={classes.formInputControl}>
					<label className={classes.formInputLabel}>Email</label>
					<TextField
						type="email"
						required
						size="small"
						name="Email"
						{...register("Email")}
						error={errors?.Email}
						helperText={errors?.Email?.message}
					/>
				</Box>
				<Box className={classes.formInputControl}>
					<label className={classes.formInputLabel}>Password</label>
					<TextField
						type="password"
						required
						size="small"
						name="Password"
						{...register("Password")}
						error={errors?.Password}
						helperText={errors?.Password?.message}
					/>
				</Box>
				<Box className={classes.formInputControl}>
					<label className={classes.formInputLabel}>Phone</label>
					<TextField
						type="text"
						required
						size="small"
						name="Phone_Number"
						{...register("Phone_Number")}
						error={errors?.Phone_Number}
						helperText={errors?.Phone_Number?.message}
					/>
				</Box>

				<Box className={classes.formInputControl}>
					<AuthButton buttonText={"CREATE ACCOUNT"} />
				</Box>

				<Box className={classes.formInputControl}>
					<GoogleButton
						label="Sign Up with Google"
						responseGoogle={responseGoogle}
					/>
				</Box>

				<Box className={classes.formInputControl}>
					<FacebookButton
						label="Sign Up with Facebook"
						responseFacebook={responseFacebook}
					/>
				</Box>
				<Box className={classes.formInputControl}>
					<Typography className={classes.formFooter}>
						Already have an account? <Link to="/auth/sign-in">SignIn</Link>
					</Typography>
				</Box>
			</form>
			<VerifyEmailModal
				isEmailModalOpen={isEmailModalOpen}
				handleEmailModal={handleEmailModal}
				handeleSendVeificationCode={handeleSendVeificationCode}
			/>

			<VerifyOTPModal
				isOTPModalOpen={isVerificationCodeSend}
				handleOTPModal={handleOTPModal}
				handeleSubmitVeificationCode={handeleSubmitVeificationCode}
			/>
		</React.Fragment>
	);
}

export default SignUp;
