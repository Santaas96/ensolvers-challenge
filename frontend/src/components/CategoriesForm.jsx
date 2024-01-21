import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { SERVER_URL } from "../../config";

const CategoriesForm = ({ children, title, initial, getCategories }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [values, setValues_] = useState(initial);

  const setValues = (e) => {
    setValues_((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const refreshValues = () => {
    setValues_(initial);
  };

  const Onsave = async () => {
    refreshValues();
    const promise = () =>
      new Promise((resolve) => {
        let body = {
          name: values.name,
        };
        if (values.id) {
          body.id = values.id;
        }
        const options = {
          method: initial.name ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(body),
        };
        fetch(`${SERVER_URL}/categories`, options)
          .then((data) => data.json())
          .then((res) => resolve(res));
      });

    toast.promise(promise, {
      loading: initial.name
        ? "Updating Category, please wait until completion."
        : "Creating Category, please wait until completion.",
      success: (data) => {
        return initial.name
          ? "Success updating Category!"
          : "Success creating Category!";
      },
      error: "Something went wrong, try again later.",
    });

    setTimeout(() => {
      getCategories();
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center items-center" onClick={onOpen}>
        {children}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-slate-900">
                {title}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1">
                  <label className="text-slate-700 text-sm">Name</label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={setValues}
                    className="bg-white border rounded-md p-1 text-slate-800"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    refreshValues();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    Onsave();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoriesForm;
