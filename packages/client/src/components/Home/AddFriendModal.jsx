import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { Button, ModalOverlay } from "@chakra-ui/react";
import { TextField } from "../TextField";
import { Formik, Form } from "formik";
import { friendSchema } from "@star-messenger/common";

const AddFriendModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values) => {
            onClose();
            // alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <TextField
                label="Friend's name"
                placeholder="Enter friend's username..."
                autoComplete="off"
                name="friendName"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
