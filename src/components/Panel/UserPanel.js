import React, { useRef } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authService, dbService, storageService } from "../../firebase";
import mime from "mime-types";
import { setPhotoURL } from "../../redux/actions/userAction";

const UserPanel = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const inputOpenImageRef = useRef();

  const onLogout = () => {
    authService.signOut();
  };

  const onOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    try {
      let uploadProfilePhoto = await storageService
        .ref()
        .child(`userImage/${user.uid}`)
        .put(file, metadata);
      let downloadURL = await uploadProfilePhoto.ref.getDownloadURL();
      await authService.currentUser.updateProfile({ photoURL: downloadURL });
      dispatch(setPhotoURL(downloadURL));
      await dbService
        .collection("users")
        .doc(user.uid)
        .update({ image: downloadURL });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <div className="d-flex">
        <Image
          src={user && user.photoURL}
          style={{
            width: "30px",
            height: "30px",
            marginLeft: "10px",
            marginTop: "3px",
          }}
          roundedCircle
        />
        <Dropdown>
          <Dropdown.Toggle
            style={{ color: "black", background: "transparent", border: "0px" }}
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={onLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        onChange={uploadImage}
        accept="image/jpeg, image/png, image/jpg"
        type="file"
        style={{ display: "none" }}
        ref={inputOpenImageRef}
      />
    </div>
  );
};

export default UserPanel;
