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
  Input,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { userAtom } from "../atom/atom";

export default function CreatePost() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [user, setUser] = useRecoilState(userAtom);

  const [formData, setFormData] = useState({
    content: "",
    title: "",
  });

  const create = async () => {
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/posts/",
      { ...formData, userId: user.id },
      { withCredentials: true }
    );
    if (!res.data.status) {
      // toast("Created Post - " + formData.title);
      toast(res.data.msg);
      return onClose();
    }
    toast(res.data.msg);
  };

  const onchange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="w-full sticky top-0 py-7 flex items-center justify-center text-white z-[1000]">
        <div
          className="button p-4 aspect-square rounded-full bg-white flex items-center justify-center text-black font-2xl cursor-pointer hover:scale-105 active:scale-100 duration-200 select-none"
          onClick={onOpen}
        >
          <FaPlus />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hey Lets Create For Scroll ✨
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Title"
                  variant="bordered"
                  validate={(_e) => {
                    return "";
                  }}
                  onChange={(e) => onchange("title", e.target.value)}
                  value={formData.title}
                />
                <Input
                  placeholder="Image Link"
                  type="text"
                  variant="bordered"
                  className="border-white/20"
                  onChange={(e) => onchange("content", e.target.value)}
                  value={formData.content}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={create}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
