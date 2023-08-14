import React, { useContext, useEffect } from "react";
import { StylesLogin } from "../styles/LoginStyles";
import { Formik } from "formik";
import { AiOutlineMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import image from "../assets/kaax.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { ApiAuthentication } from "../api/ApiAuthentication";
import { useNavigate } from "react-router-dom";

let userData = {
    token: "",
    idUser: 0,
    email: "",
    name: "",
    phone: "",
    role: "",
    status: "",
    userImage: "",
    username: ""
}

export const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { LoginData, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const PasswordBtn = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if(isAuthenticated && userData.role === "ROLE_ADMIN"){
            navigate('/home');
        }
    }, [isAuthenticated])
    

    const UserAuthenticate = async (values) => {
		try {
			const response = await ApiAuthentication(values);
			if (response.response === null) {
                toast.error('Ocurrio un error', {
                    position: 'top-center', // Posición de la notificación
                    duration: 2000, // Duración en milisegundos
                });
			} else {
				userData = {
					token: response.data.response.token,
					idUser: response.data.response.user.idUser,
					email: response.data.response.user.email,
					name: response.data.response.user.name,
					phone: response.data.response.user.phone,
					role: response.data.response.user.role.authority,
					status: response.data.response.user.status,
					userImage: response.data.response.user.userImage,
					username: response.data.response.user.username
				}
                if(userData.role === "ROLE_ADMIN"){
                    setIsAuthenticated(true)
                    console.log(userData)
                    LoginData(userData)
                    toast.success('Bienvenido', {
                        position: 'top-center', // Posición de la notificación
                        duration: 2000, // Duración en milisegundos
                    });
                    navigate('/home');

                } else {
                    toast.error('No tienes los permisos necesarios', {
                        position: 'top-center', // Posición de la notificación
                        duration: 2000, // Duración en milisegundos
                    });
                }

	
			}
		} catch (error) {
            console.log(error)
            toast.error('Ocurrio un error', {
                position: 'top-center', // Posición de la notificación
                duration: 2000, // Duración en milisegundos
            });
		}
    }

    const ValidValues = (values) => {
        if (values.email === "" || values.password === "") {
            toast.error('Por favor completa todos los campos.', {
                position: 'top-center', // Posición de la notificación
                duration: 2000, // Duración en milisegundos
            });
        }
        }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required(true).email("Ingresa un correo válido"),
        password: Yup.string()
          .required(true)
          .min(8, "La contraseña debe tener al menos 8 caracteres")
          .matches(
            /^(?=.*[a-z])/, // Al menos una letra minúscula
            "La contraseña debe tener al menos una letra minúscula"
          )
      });

    return (
        <div className="container " style={StylesLogin.backGradiendt}>
            <div className="row vh-100 justify-content-center align-items-center ">
                <div className="col-xs-12 col-sm-6 col-md-4  mx-auto ">
                    <div className="card" style={StylesLogin.cardContent}>
                        <div className="card-body ">
                            <img src={image} style={StylesLogin.logo}></img>
                            <h2>Inicio de sesión</h2>
                            <br></br>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={values => 
                                  {  console.log(values)
                                    UserAuthenticate(values)
                                  }
                                }
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue, isValid, }) => (
                                    <div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text mh-10" id="inputGroup-sizing-default">
                                                <AiOutlineMail size={25} />
                                            </span>
                                            <input type="text" className="form-control" placeholder="Ingresa un correo"
                                                onChange={handleChange("email")}
                                                value={values.email}
                                                onBlur={handleBlur("email")}
                                            />
                                           
                                        </div>
                                            <p style={StylesLogin.error}>{errors.email}</p>
                                        <br></br>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text width-50" id="inputGroup-sizing-default"><MdPassword size={25} /></span>
                                            <input type="text" className="form-control" placeholder="Ingresa una contraseña" 
                                                onChange={handleChange("password")}
                                                value={values.password}
                                                onBlur={handleBlur("password")} />
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={PasswordBtn}>{showPassword ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}</button>
                                        </div>
                                        <p style={StylesLogin.error}>{errors.password}</p>
                                        <br></br>
                                        <br></br>
                                        <button className="btn btn-primary" onClick={()=>(ValidValues(values), handleSubmit())} type="submit" disabled={!isValid}>Acceder</button>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}