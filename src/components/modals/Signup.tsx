/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { authAtom, userAtom } from "../../atom/atom";
import { toast } from "react-toastify";

export default function Signup() {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    validatepassword: "",
    username: "",
    profilePicture: "",
  });

  const signup = async () => {
    // e.preventDefault();
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/user/signup",
      formData,{withCredentials:true}
    );
    if (!res.data.status) {
      setUser(res.data.data);
      setAuth(true)
      return onClose()
    }
    toast(res.data.msg);
  };

  const onchange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Button onPress={onOpen} size="sm">
        Sign Up
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hey Let's Scroll Together !
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Enter Your Email"
                  variant="bordered"
                  required
                  validate={(_e) => {
                    return "";
                  }}
                  onChange={(e) => onchange("email", e.target.value)}
                  value={formData.email}
                />
                <Input
                  endContent={
                    <FaLock className="text-xl text-default-400 cursor-pointer flex-shrink-0" />
                  }
                  required
                  placeholder="Enter Your Password"
                  type="password"
                  variant="bordered"
                  className="border-white/20"
                  value={formData.password}
                  onChange={(e) => onchange("password", e.target.value)}
                />
                <Input
                  required
                  placeholder="Re Enter Your Password"
                  variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  value={formData.validatepassword}
                  onChange={(e) => onchange("validatepassword", e.target.value)}
                />
                <Input
                  required
                  placeholder="Your User Name"
                  variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  value={formData.username}
                  onChange={(e) => onchange("username", e.target.value)}
                />
                <Input
                  required
                  placeholder="Your Name"
                  variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  value={formData.name}
                  onChange={(e) => onchange("name", e.target.value)}
                />
                <Input
                  required
                  placeholder="Your Profile Image"
                  variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  value={formData.profilePicture}
                  onChange={(e) => onchange("profilePicture", e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between text-white">
                  <Checkbox
                    required
                    classNames={{
                      label: "text-xs text-white",
                    }}
                  >
                    Accept Privacy Policy
                  </Checkbox>
                  <Link color="primary" href="#" size="sm" className="text-xs">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={signup}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
