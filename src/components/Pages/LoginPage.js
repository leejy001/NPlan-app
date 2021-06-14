import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../../firebase";
import "../form.css";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFormSubmit, setErrorFormSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await authService.signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      setErrorFormSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFormSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>이메일 형식이 올바르지 않습니다.</p>}
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>비밀번호가 틀립니다.</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>비밀번호는 6자리 이상 입력하세요</p>
        )}
        {errorFormSubmit && <p>{errorFormSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="/register">
          아직 아이디가 없다면...
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
