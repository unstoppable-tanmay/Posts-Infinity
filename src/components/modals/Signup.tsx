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
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default function Signup() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>
        Sign Up
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hey Let's Scroll Together !</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Enter Your Email"
                  variant="bordered"
                  required
                  validate={e=>{return ""}}
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
                />
                <Input
                  required
                  placeholder="Re Enter Your Password"
                  variant="bordered"
                  validate={(e) => {
                    return "";
                  }}
                />
                <Input
                  placeholder="Your Name ? Harry"
                  variant="bordered"
                  validate={(e) => {
                    return "";
                  }}
                />
                <Input
                  placeholder="Your Profile Image"
                  variant="bordered"
                  validate={(e) => {
                    return "";
                  }}
                />
                <div className="flex py-2 px-1 justify-between text-white">
                  <Checkbox
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
                <Button color="primary" onPress={onClose}>
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
