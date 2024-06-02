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
import { FaLock, FaPlus } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    // e.preventDefault();
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/user/login",
      formData,
      { withCredentials: true }
    );
    if (!res.data.status) {
      // setUser(res.data.data);
      // setAuth(true);
      return onClose();
    }
    toast(res.data.msg);
  };

  const onchange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="w-full sticky top-0 py-5 flex items-center justify-center text-white z-[1000]">
        <div
          className="button w-10 p-4 aspect-square rounded-full bg-white flex items-center justify-center text-black font-2xl cursor-pointer hover:scale-105 active:scale-100 duration-200 select-none"
          onClick={onOpen}
        >
          <FaPlus />
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hey Lets Scroll !
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  onChange={(e) => onchange("email", e.target.value)}
                  value={formData.email}
                />
                <Input
                  endContent={
                    <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  className="border-white/20"
                  onChange={(e) => onchange("password", e.target.value)}
                  value={formData.password}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={login}>
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
