import React, {useEffect,useState} from 'react';
import '../Styles/LoginandRegister.css';
import { Link, useParams} from 'react-router-dom';
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    
    useEffect(()=>{
        const selectedRole = localStorage.getItem("selectedRole");
        if (selectedRole) {
            setFormData((prevData) => ({
                ...prevData,
                role: selectedRole,
            }));
        }
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        // try {
        //     const response = await fetch("/register/postRegister", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(formData),
        //     });

        //     const result = await response.json();
        //     if (response.ok) {
        //         alert("Registration successful!");
        //     } else {
        //         alert(`Error: ${result.message}`);
        //     }
        // } catch (error) {
        //     console.error("Error submitting form:", error);
        //     alert("An error occurred while submitting the form.");
        // }
    };
    return (
        <section id="loginPage">
            <div class="custom-button-wrapper">
                <div class="link_wrapper">
                    <a href="/home">Home</a>
                </div>
            </div>

            <div class="main-w3layouts wrapper">
                <div class="logo">
                    <img src="/Images/logoITISE.png" alt="Logo" width="150" height="auto" />
                </div>

                <div class="main-agileinfo">
                    <div class="agileits-top">
                        <form onSubmit={handleSubmit}>
                            <input class="text" type="text" autocomplete="off" name="user_name" placeholder="Tên tài khoản"
                                required="" onChange={handleChange}/>
                            <input class="text email" autocomplete="off" type="email" name="email" placeholder="Email"
                                required="" onChange={handleChange}/>
                            <input class="text" type="password" name="password" placeholder="Mật khẩu" required="" onChange={handleChange}/>
                            <input class="text w3lpass" type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu"
                                required="" onChange={handleChange}/>
                            <input type="submit" value="Đăng Ký"/>
                        </form>
                        <p>Bạn đã có tài khoản? <a href="./login">Đăng nhập ngay</a></p>
                    </div>
                </div>

                <div class="colorlibcopy-agile">
                    <p>© 2018 Colorlib Signup Form. All rights reserved | Design by <a href="https://colorlib.com/"
                            target="_blank">Colorlib</a></p>
                </div>

                <ul class="colorlib-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </section>
    );
};

export default RegisterPage;