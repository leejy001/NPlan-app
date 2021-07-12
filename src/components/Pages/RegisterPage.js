import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService, dbService } from "../../firebase";
import md5 from "md5";

const RegisterPage = () => {
  const history = useHistory();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFormSubmit, setErrorFormSubmit] = useState("");
  const [loadig, setLoading] = useState(false);
  const password = useRef();
  password.current = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createdUser = await authService.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await createdUser.user.updateProfile({
        displayName: data.name,
        photoURL: `http:gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });
      const newUser = {
        _id: createdUser.user.uid,
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      };
      await dbService
        .collection("users")
        .doc(createdUser.user.uid)
        .set(newUser);
      history.push("/");
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
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>이메일 형식이 올바르지 않습니다.</p>}
        <label>Name</label>
        <input {...register("name", { required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === "required" && (
          <p>이름 형식이 맞지 않습니다.</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>이름 최대 길이를 초과했습니다.</p>
        )}
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>비밀번호가 맞지 않습니다.</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>비밀번호는 6자리 이상 입력하세요</p>
        )}
        <label>Password Confirm</label>
        <input
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>비밀번호 형식이 맞지 않습니다.</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>비밀번호가 서로 일치하지 않습니다.</p>
          )}
        {errorFormSubmit && <p>{errorFormSubmit}</p>}
        <input type="submit" disabled={loadig} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="/login">
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
