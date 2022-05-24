import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { makeStyles } from "@mui/styles";
import AuthenticationHeader from "./authenticationHeader";
import { Grid, Typography, MenuItem, Select } from "@mui/material";
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
	formInputControll: {
		display: "flex",
		flexDirection: "column",
		marginBottom: "10px",
	},
	inputBase: {
		fontSize: "14px",
		backgroundColor: "white",
		borderRadius: "5px",
		color: "black",
		padding: "10px 10px 5px 15px",
	},
	form: {
		width: "500px",
		boxShadow: "rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px",
		padding: "30px",
		background: " linear-gradient(to right, #8e44ad, #ff9f95)",
		color: theme.palette.black.main,
		marginTop: "20px",
	},

	formFooter: {
		color: theme.palette.black.main,
		marginTop: "5px",
		fontSize: "14px",
		"& a": {
			color: "blue",
			textDecoration: "none",
		},
	},
	selectStyle: {
		backgroundColor: "white",
	},
	selectMenu: {
		"& li": {
			color: theme.palette.black.main,
		},
	},
	selectError: {
		color: "#D62F2F",
		fontSize: "12px",
		margin: "2px 0px 0px 10px",
	},
	errorBorder: {
		border: "1px solid red",
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
	const [genderValue, setGetnderValue] = useState("");

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
			<Grid
				container
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				<Grid item xs={6}>
					<form
						className={classes.form}
						onSubmit={handleSubmit((data) => handleOnSubmit(data))}
						noValidate
					>
						<AuthenticationHeader title="Create your account" />
						<Grid container spacing={1}>
							<Grid item md={6}>
								<Box className={classes.formInputControll}>
									<InputBase
										className={`${classes.inputBase} ${
											errors?.First_Name ? classes.errorBorder : ""
										}`}
										type="text"
										required
										size="small"
										name="First_Name"
										placeholder="First Name*"
										{...register("First_Name")}
									/>
									<Box component="span" className={classes.selectError}>
										{errors?.First_Name?.message}
									</Box>
								</Box>
							</Grid>
							<Grid item md={6}>
								<Box className={classes.formInputControll}>
									<InputBase
										className={classes.inputBase}
										type="text"
										required
										size="small"
										name="Last_Name"
										placeholder="Last Name*"
										{...register("Last_Name")}
									/>
									<Box component="span" className={classes.selectError}>
										{errors?.Last_Name?.message}
									</Box>
								</Box>
							</Grid>
						</Grid>

						<Box className={classes.formInputControll}>
							<InputBase
								className={classes.inputBase}
								type="email"
								required
								size="small"
								name="Email"
								placeholder="Email*"
								{...register("Email")}
							/>
							<Box component="span" className={classes.selectError}>
								{errors?.Email?.message}
							</Box>
						</Box>
						<Box className={classes.formInputControll}>
							<InputBase
								className={classes.inputBase}
								type="password"
								required
								size="small"
								name="Password"
								placeholder="Password*"
								{...register("Password")}
							/>
							<Box component="span" className={classes.selectError}>
								{errors?.Password?.message}
							</Box>
						</Box>
						<Box className={classes.formInputControll}>
							<InputBase
								className={classes.inputBase}
								type="text"
								required
								size="small"
								name="Phone_Number"
								placeholder="Phone*"
								{...register("Phone_Number")}
							/>
							<Box component="span" className={classes.selectError}>
								{errors?.Phone_Number?.message}
							</Box>
						</Box>
						<Box className={classes.formInputControll}>
							<Select
								name="Gender"
								{...register("Gender")}
								size="small"
								displayEmpty
								value={genderValue}
								className={classes.selectStyle}
								onChange={(e) => setGetnderValue(e.target.value)}
								MenuProps={{ classes: { paper: classes.selectMenu } }}
								error={errors?.Gender}
							>
								<MenuItem disabled value="">
									Select Gender*
								</MenuItem>
								<MenuItem value={"Male"}>Male</MenuItem>
								<MenuItem value={"Femail"}>Female</MenuItem>
								<MenuItem value={"Other"}>Other</MenuItem>
							</Select>
							<Box component="span" className={classes.selectError}>
								{errors?.Gender?.message}
							</Box>
						</Box>

						<Box className={classes.formInputControll}>
							<AuthButton buttonText={"CREATE ACCOUNT"} />
						</Box>

						<Grid container justifyContent="center" spacing={1}>
							<Grid item md={6}>
								<Box className={classes.formInputControll}>
									<GoogleButton
										label="Google"
										responseGoogle={responseGoogle}
									/>
								</Box>
							</Grid>
							<Grid item md={6}>
								<Box className={classes.formInputControll}>
									<FacebookButton
										label="Facebook"
										responseFacebook={responseFacebook}
									/>
								</Box>
							</Grid>
						</Grid>

						<Box className={classes.formInputControll}>
							<Typography className={classes.formFooter}>
								Already have an account? <Link to="/auth/sign-in">SignIn</Link>
							</Typography>
						</Box>
					</form>
				</Grid>
			</Grid>
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
