import * as yup from "yup";
export const signUpSchema = yup.object().shape({
	First_Name: yup.string().required("Please enter first name"),
	Last_Name: yup.string().required("Please enter last name"),
	Email: yup
		.string()
		.required("Please enter email")
		.email("Please enter a valid email address."),
	Password: yup
		.string()
		.required("Please enter password")
		.min(8, "Password must be at least 8 characters long.")
		.max(24, "Password must be less than 24 characters long."),
	Phone_Number: yup
		.string()
		.required("Please enter phone no.")
		.min(10, "Invalid number")
		.matches(/^\d+$/, "Only number allow"),
	Gender: yup.string().required("Please select the gender."),
});

export const signInSchema = yup.object().shape({
	Email: yup
		.string()
		.required("Please enter email")
		.email("Please enter a valid email address."),
	Password: yup
		.string()
		.required("Please enter password")
		.min(8, "Password must be at least 8 characters long.")
		.max(24, "Password must be less than 24 characters long."),
});

export const forgotSchema = yup.object().shape({
	Email: yup
		.string()
		.required("Please enter email.")
		.email("Please enter a valid email address."),
});

export const resetPasswordSchema = yup.object().shape({
	Password: yup
		.string()
		.required("Please enter password.")
		.min(8, "Password must be at least 8 characters long.")
		.max(24, "Password must be less than 24 characters long."),
	CPassword: yup
		.string()
		.required("Please enter password.")
		.oneOf([yup.ref("Password"), null], "Passwords must match"),
});
